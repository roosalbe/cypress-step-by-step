import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: true,

    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Environment variables
    env: {
      // API URL
      apiUrl: 'http://localhost:3001/api',
      // Test user credentials
      testUserEmail: 'student@test.nl',
      testUserPassword: 'cypress123',
      adminEmail: 'admin@test.nl',
      adminPassword: 'admin123',
    },

    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });

      return config;
    },
  },
});
