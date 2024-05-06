import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '7tuoui',

  e2e: {
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
  reporter: 'mochawesome',
  video: true,
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'cypress/reports/mochawesome/',
  },
});
