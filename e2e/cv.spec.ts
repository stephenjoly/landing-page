import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import inventory from '../docs/cv-experience-points.json'

const points = [
  ...inventory.roles.flatMap((role) => role.points),
  ...inventory.sharedDeloittePoints,
]

test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url())
    return ['127.0.0.1', 'localhost'].includes(url.hostname)
      ? route.continue()
      : route.abort()
  })
})

test('CV keeps the entire approved record, metadata and résumé', async ({
  page,
  request,
}) => {
  const response = await request.get('/cv')
  expect(response.ok()).toBeTruthy()
  expect(await response.text()).toContain('dayforce-workforce-spend-analysis')
  await page.goto('/cv')
  await expect(page).toHaveTitle('CV - Stephen Joly')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://stephenjoly.net/cv',
  )
  await expect(
    page.getByRole('heading', { name: 'Experience', exact: true }),
  ).toBeVisible()
  expect(points).toHaveLength(60)
  expect(inventory.roles).toHaveLength(20)
  for (const role of inventory.roles) {
    await expect(page.locator(`#${role.id}`)).toHaveCount(1)
  }
  for (const point of points) {
    await expect(page.locator(`#${point.id}`)).toHaveText(point.text)
  }
  await expect(page.locator('#education > ol > li')).toHaveCount(2)
  await expect(page.locator('#awards li')).toHaveCount(7)
  for (const language of ['English', 'Armenian', 'French']) {
    await expect(
      page.locator('#skills').getByText(language, { exact: true }),
    ).toHaveCount(1)
  }
  await expect(
    page.locator('#dayforce-workforce-spend-analysis'),
  ).toContainText('US$41M')
  const download = page
    .getByRole('link', { name: 'Download résumé', exact: true })
    .first()
  await expect(download).toHaveAttribute(
    'download',
    'Stephen Joly - Resume.pdf',
  )
  const pdf = await request.get((await download.getAttribute('href'))!)
  expect(pdf.ok()).toBeTruthy()
  const content = await pdf.body()
  expect(content.subarray(0, 4).toString()).toBe('%PDF')
  expect(createHash('sha256').update(content).digest('hex')).toBe(
    createHash('sha256')
      .update(readFileSync('public/files/Stephen Joly - Resume.pdf'))
      .digest('hex'),
  )
})

for (const width of [1440, 1024, 768, 390, 320]) {
  test(`CV navigation and text action work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/about')
    if (width < 1024)
      await page.getByRole('button', { name: 'Menu', exact: true }).click()
    await page.getByRole('link', { name: 'CV', exact: true }).first().click()
    await expect(page).toHaveURL(/\/cv$/)
    await expect(
      page.getByRole('heading', { name: 'Experience', exact: true }),
    ).toBeVisible()
    await expect(
      page.locator('footer').getByRole('link', { name: 'CV', exact: true }),
    ).toHaveAttribute('href', '/cv')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy()
    const link = page.getByRole('link', {
      name: 'See all my Deloitte projects',
      exact: true,
    })
    await expect(link).toHaveAttribute('href', '/projects?tab=consulting')
    await page.keyboard.press('Tab')
    await link.focus()
    expect(
      await link.evaluate((el) => el.matches(':focus-visible')),
    ).toBeTruthy()
    const size = await link.boundingBox()
    expect(size!.height).toBeGreaterThanOrEqual(44)
    expect(
      await link.evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe('rgba(0, 0, 0, 0)')
    await link.press('Enter')
    await expect(page).toHaveURL(/\/projects\?tab=consulting$/)
    await expect(
      page.getByRole('button', { name: 'Consulting 29', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(
      page.getByRole('button', {
        name: 'Engineering student mentorship',
        exact: true,
      }),
    ).toHaveCount(0)
    await expect(
      page.getByRole('button', {
        name: 'Business process automation',
        exact: true,
      }),
    ).toHaveCount(0)
  })
}

test('CV disclosure, wayfinding and themes remain usable', async ({ page }) => {
  await page.goto('/cv')
  const toc = page.getByRole('navigation', {
    name: 'On this page',
    exact: true,
  })
  await toc.getByRole('link', { name: 'Education', exact: true }).click()
  await expect(page).toHaveURL(/#education$/)
  await expect(
    toc.getByRole('link', { name: 'Education', exact: true }),
  ).toHaveAttribute('aria-current', 'location')
  const summary = page.locator('#education summary')
  await summary.focus()
  await summary.press('Enter')
  await expect(page.locator('#education details')).toHaveAttribute('open', '')
  await expect(page.getByText('Capstone:', { exact: true })).toBeVisible()
  await summary.press('Enter')
  await expect(page.locator('#education details')).not.toHaveAttribute('open')
  await page.getByText('Dark', { exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByText('Light', { exact: true }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.getByText('System', { exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  )
  await expect(
    toc.getByRole('link', { name: 'Awards and recognition', exact: true }),
  ).toHaveAttribute('aria-current', 'location')
})
