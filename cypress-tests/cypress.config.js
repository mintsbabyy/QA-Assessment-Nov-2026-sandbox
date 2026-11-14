const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4000',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    setupNodeEvents(on, config) {
      config.env.BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
      config.env.BUSINESS_PASSWORD = process.env.BUSINESS_PASSWORD;
      return config;
    },
  },
});
