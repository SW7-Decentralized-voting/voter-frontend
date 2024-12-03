import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  projectId: 'k24rot',
  supportFolder: '__test__/cypress/support',
  fixturesFolder: '__test__/cypress/fixtures',
  e2eFolder: '__test__/cypress/e2e',
  screenshotsFolder: '__test__/cypress/screenshots',
  chromeWebSecurity: false,
  downloadsFolder: '__test__/cypress/downloads',
  e2e: {
    baseUrl: 'http://localhost:2525',
    specPattern: '__test__/cypress/e2e/**/*.cy.js',
    supportFile: '__test__/cypress/support/e2e.js',
  },
  component: {
    devserver:{
      framework: 'react',
      bundler: 'vite',
    },
  },
  env: {
    BACKEND_URL: process.env.VITE_API_URL,
    BLOCKCHAIN_API: process.env.VITE_BLOCKCHAIN_API_URL,
    VITE_PORT: process.env.VITE_PORT,
  },
  hosts: {
    'cypress-secure': '127.0.0.1',
  }
});
