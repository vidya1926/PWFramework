/**
 * Configuration file for Playwright test framework.
 * Configures test directory, timeouts, parallel execution, retries, workers, reporters, and test settings.
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Specifies the directory where tests are located
  testDir: './tests',

  // Global timeout setting for tests in milliseconds
  timeout: 240 * 1000,

  // Enables fully parallel execution of tests if true
  fullyParallel: true,

  // Prevents 'only' tests from being executed in CI environments
  forbidOnly: !!process.env.CI,

  // Number of retries for failed tests, increased in CI environment
  retries: process.env.CI ? 2 : 0,

  // Number of worker processes for test execution, adjusted for CI environment
  workers: process.env.CI ? 1 : 1,

  // Specifies reporters for test results, including HTML with auto-open feature
  reporter: [['html',{open:'always'}],['./custom-reporters/reporter.ts']],
  
  // Global settings for Playwright test execution
  use: {
    // Enables tracing for test operations
    trace: 'on',

    // Runs tests in non-headless mode for visibility
    headless: false,

    // Captures video recordings of test execution
    video: 'on',

    // Takes screenshots on test failure
    screenshot: 'on',
  },

  // Configuration for individual test projects
  projects: [
    {
      // Name of the project (browser) for testing
      name: 'chromium',

      // Configuration specific to Chromium browser testing
      use: {
        // Loads a predefined device configuration (Desktop Chrome)
        ...devices['Desktop Chrome'],

        // Launch options for Chromium browser
        launchOptions: {
          args: ["--start-maximized"] // Starts Chromium in maximized window mode
        },

        // Timeout for actions within tests in milliseconds
        actionTimeout: 15000,
      }
    }
  ],
});