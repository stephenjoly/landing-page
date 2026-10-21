import { test, expect } from '@playwright/test';

test('local app starts and renders its public UI', async ({ page }) => {
  // Keep this frontend smoke isolated from live services and production data.
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') return route.abort();
    return route.continue();
  });
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  await page.goto('/projects');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
