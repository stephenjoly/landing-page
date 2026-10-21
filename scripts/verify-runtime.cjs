// Against an already-started production server; this never sends valid contact data.
const assert = require('node:assert/strict')
const base = new URL(process.argv[2] || 'http://127.0.0.1:3000')
async function check() {
  const routes = ['/', '/health', '/about', '/contact', '/articles',
    '/articles/what-i-learned-from-the-2025-caribbean-canada-leader-dialogue',
    '/projects?tab=coding', '/projects?tab=consulting', '/speaking', '/uses', '/thank-you']
  for (const route of routes) {
    const response = await fetch(new URL(route, base))
    assert.equal(response.status, 200, route)
    const text = await response.text()
    if (route === '/') {
      const asset = text.match(/(?:src|href)="([^\"]*\/_next\/static\/[^\"]+)"/)
      assert.ok(asset, 'Home includes a generated static asset')
      assert.equal((await fetch(new URL(asset[1].replaceAll('&amp;', '&'), base))).status, 200)
    }
    if (route.startsWith('/articles/')) {
      assert.match(text, /data-mdx-content/, 'article renders MDX body')
    }
    console.log(`PASS ${route}`)
  }
  const resume = await fetch(new URL('/files/Stephen%20Joly%20-%20Resume.pdf', base))
  assert.equal(resume.status, 200)
  assert.match(resume.headers.get('content-type') || '', /application\/pdf/)
  assert.equal(Buffer.from(await resume.arrayBuffer()).subarray(0, 5).toString(), '%PDF-')
  console.log('PASS resume PDF')
  const invalid = await fetch(new URL('/api/contact', base), {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
  })
  assert.equal(invalid.status, 422)
  assert.equal((await invalid.json()).ok, false)
  console.log('PASS contact validation (no provider request) and static assets')
}
check().catch(error => { console.error(error.message); process.exitCode = 1 })
