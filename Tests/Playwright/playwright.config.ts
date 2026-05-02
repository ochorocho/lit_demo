import * as path from 'path';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: './playwright-report',
      },
    ],
  ],
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://tryout.ddev.site/typo3/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'login',
      testMatch: 'helper/login.setup.ts',
    },
    {
      name: 'e2e',
      testMatch: 'e2e/**/*.spec.ts',
      dependencies: ['login'],
      use: {
        storageState: path.join(__dirname, '.auth/login.json'),
      },
    },
  ],
  outputDir: './test-results',
});