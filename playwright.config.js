// @ts-check
import { defineConfig, devices } from '@playwright/test';

const generateCustomLayout = require('./custom-layout-report');


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  globalSetup: './global-setup.js',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        // channels: ["automation-test-reports"], // provide one or more Slack channels
        // channel: #automation-test-reports
        slackWebHookUrl: "https://hooks.slack.com/services/TOKEN/TOKEN/TOKEN",
        
        // channel: #temp-at-report-for-testing
        // slackWebHookUrl: "https://hooks.slack.com/services/TOKEN/TOKEN/TOKEN",
        sendResults: process.env.SLACK || "off", // "always" , "on-failure", "off"
        layout: generateCustomLayout,
      },
    ],
    ['html'],
    // ['json', { outputFile: 'playwright-report/report.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 120000, // ⬅️ Timeout per test case: 90s
  use: {
    launchOptions: {
      slowMo: 1000,  
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 20000, // optional: timeout per action (click, fill, etc)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});

