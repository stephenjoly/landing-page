const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')

// Exercise the server page's async request contract without rendering its client UI.
const source = ts.transpileModule(
  fs.readFileSync('src/app/projects/page.tsx', 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText
const data = { codingProjects: [], consultingProjects: [] }
const moduleUnderTest = { exports: {} }
new Function('require', 'module', 'exports', source)(
  (name) => {
    if (name === '@/lib/site') {
      const helper = { exports: {} }
      const compiled = ts.transpileModule(fs.readFileSync('src/lib/site.ts', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      }).outputText
      new Function('require', 'module', 'exports', compiled)(require, helper, helper.exports)
      return helper.exports
    }
    if (name === './data') return data
    if (name === '@/components/ProjectsGallary') return { default: 'gallery' }
    return require(name)
  },
  moduleUnderTest,
  moduleUnderTest.exports,
)

for (const [tab, expected] of [
  [undefined, 'coding'], ['coding', 'coding'], ['consulting', 'consulting'],
  ['invalid', 'coding'], [['consulting', 'coding'], 'consulting'], [[], 'coding'],
]) {
  test(`Projects awaits query parameters and selects ${JSON.stringify(tab)}`, async () => {
    const page = await moduleUnderTest.exports.default({
      searchParams: Promise.resolve({ tab }),
    })
    assert.equal(page.props.initialTab, expected)
    assert.equal(page.props.codingProjects, data.codingProjects)
    assert.equal(page.props.consultingProjects, data.consultingProjects)
  })
}

test('MDX server loader receives RSC context without mutating shared SWC defaults', async () => {
  const { default: config } = await import('../next.config.mjs')
  const sharedLoader = { loader: 'next-swc-loader', options: { development: false } }
  const otherRule = { test: /\.tsx?$/, use: [sharedLoader] }
  const webpackConfig = { resolve: { alias: {} }, module: { rules: [otherRule] } }
  config.webpack(webpackConfig, { isServer: true, defaultLoaders: { babel: sharedLoader } })
  const mdxRule = webpackConfig.module.rules.find(rule => rule.test.test('page.mdx'))
  assert.equal(mdxRule.use[0].options.bundleLayer, 'rsc')
  assert.equal(sharedLoader.options.bundleLayer, undefined)
  assert.equal(otherRule.use[0], sharedLoader)
  assert.ok(mdxRule.use[1].loader.endsWith('mdx-js-loader.js'))
})

test('MDX browser loader and existing explicit bundle layer stay unchanged', async () => {
  const { default: config } = await import('../next.config.mjs')
  for (const [isServer, bundleLayer] of [[false, undefined], [true, 'ssr']]) {
    const loader = { loader: 'next-swc-loader', options: { bundleLayer } }
    const webpackConfig = { resolve: { alias: {} }, module: { rules: [] } }
    config.webpack(webpackConfig, { isServer, defaultLoaders: { babel: loader } })
    assert.equal(webpackConfig.module.rules[0].use[0], loader)
    assert.equal(loader.options.bundleLayer, bundleLayer)
  }
})
