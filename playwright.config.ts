import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true
  ,
  retries: 2,
  workers: 4,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }], ['allure-playwright']],
  use: {
    baseURL: 'https://www.hdfc.bank.in/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,

  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    // //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
