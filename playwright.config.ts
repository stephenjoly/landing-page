import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4182', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: "npm run dev -- --hostname 127.0.0.1 --port 4182", url: 'http://127.0.0.1:4182', reuseExistingServer: false, timeout: 120_000 },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
