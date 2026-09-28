const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

// Compile the small server modules in memory without another runtime dependency.
function loadTs(relative, cache = new Map()) {
  const filename = path.resolve(__dirname, '..', relative)
  if (cache.has(filename)) return cache.get(filename)
  const module = { exports: {} }
  cache.set(filename, module.exports)
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const localRequire = (name) =>
    name.startsWith('@/')
      ? loadTs(`src/${name.slice(2)}.ts`, cache)
      : require(name)
  new Function('require', 'module', 'exports', source)(
    localRequire,
    module,
    module.exports,
  )
  return module.exports
}
const contact = loadTs('src/lib/contact.ts')
const valid = {
  name: 'Alex',
  email: 'alex@example.com',
  organization: '',
  message: 'A test idea.',
  website: '',
}
let originalFetch
let env
beforeEach(() => {
  originalFetch = global.fetch
  env = { ...process.env }
  process.env.RESEND_API_KEY = 'test-only-not-a-real-key'
  process.env.CONTACT_FROM_EMAIL = 'sender@example.com'
  process.env.CONTACT_TO_EMAIL = 'recipient@example.com'
  global.fetch = async () => {
    throw new Error('Unexpected network call')
  }
})
afterEach(() => {
  global.fetch = originalFetch
  process.env = env
})
function request(body, headers = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

test('validates required fields, email format, whitespace and lengths', () => {
  assert.deepEqual(contact.validateContact(valid), {})
  for (const name of ['name', 'email', 'message']) {
    assert.ok(contact.validateContact({ ...valid, [name]: '  ' })[name])
  }
  assert.ok(contact.validateContact({ ...valid, email: 'bad@address' }).email)
  assert.ok(contact.validateContact({ ...valid, name: 'a'.repeat(101) }).name)
  assert.ok(
    contact.validateContact({ ...valid, organization: 'a'.repeat(201) })
      .organization,
  )
  assert.ok(
    contact.validateContact({ ...valid, message: 'a'.repeat(5001) }).message,
  )
})

test('server rejects malformed payloads, honeypot, cross-site and large bodies', async () => {
  const { POST } = loadTs('src/app/api/contact/route.ts')
  for (const body of [
    '{',
    null,
    [],
    { ...valid, email: {} },
    { ...valid, website: 'bot' },
  ]) {
    assert.equal((await POST(request(body))).status, 400)
  }
  assert.equal(
    (await POST(request(valid, { 'content-type': 'text/plain' }))).status,
    415,
  )
  assert.equal(
    (await POST(request(valid, { 'sec-fetch-site': 'cross-site' }))).status,
    403,
  )
  assert.equal(
    (await POST(request(valid, { 'content-length': '40000' }))).status,
    413,
  )
  assert.equal(
    (await POST(request({ ...valid, message: 'a'.repeat(40000) }))).status,
    400,
  )
  const invalid = await POST(request({ ...valid, email: 'wrong', message: '' }))
  assert.equal(invalid.status, 422)
  assert.deepEqual(Object.keys((await invalid.json()).fieldErrors), [
    'email',
    'message',
  ])
})

test('missing configuration is recoverable and never reports success', async () => {
  delete process.env.RESEND_API_KEY
  const response = await loadTs('src/app/api/contact/route.ts').POST(
    request(valid),
  )
  assert.equal(response.status, 503)
  assert.equal((await response.json()).ok, false)
})

test('provider receives fixed recipient, plain text, and visitor reply-to', async () => {
  let sent
  global.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails')
    sent = JSON.parse(options.body)
    return Response.json({ id: 'test-id' })
  }
  const response = await loadTs('src/app/api/contact/route.ts').POST(
    request({ ...valid, name: ' Alex ', message: '<script>test</script>' }),
  )
  assert.equal(response.status, 200)
  const result = await response.json()
  assert.equal(result.ok, true)
  assert.ok(Number.isFinite(Date.parse(result.deliveredAt)))
  assert.equal(sent.reply_to, valid.email)
  assert.deepEqual(sent.to, ['recipient@example.com'])
  assert.equal(sent.from, 'sender@example.com')
  assert.equal(sent.html, undefined)
  assert.match(sent.text, /Name: Alex\n/)
  assert.match(sent.text, /<script>test<\/script>/)
})

test('provider rejection, timeout and malformed success remain recoverable', async () => {
  for (const fetcher of [
    async () => new Response('provider details', { status: 429 }),
    async () => {
      throw new Error('private provider detail')
    },
    async () => Response.json({}),
  ]) {
    global.fetch = fetcher
    const response = await loadTs('src/app/api/contact/route.ts').POST(
      request(valid),
    )
    assert.equal(response.status, 502)
    const result = await response.json()
    assert.equal(result.ok, false)
    assert.doesNotMatch(result.error, /provider detail/)
  }
})

test('limits repeated sends with Retry-After and does not call provider again', async () => {
  let calls = 0
  global.fetch = async () => {
    calls++
    return Response.json({ id: 'test-id' })
  }
  const { POST } = loadTs('src/app/api/contact/route.ts')
  for (let i = 0; i < 5; i++)
    assert.equal((await POST(request(valid))).status, 200)
  const response = await POST(request({ ...valid, email: 'ALEX@example.com' }))
  assert.equal(response.status, 429)
  assert.ok(Number(response.headers.get('retry-after')) > 0)
  assert.equal(calls, 5)
})

test('global budget catches rotating addresses and resets after window', () => {
  const limit = loadTs('src/lib/contactRateLimit.ts').createContactRateLimiter()
  for (let i = 0; i < 30; i++)
    assert.equal(limit(`person${i}@example.com`, 1000), 0)
  assert.equal(limit('another@example.com', 1000), 900)
  assert.equal(limit('another@example.com', 901000), 0)
})
