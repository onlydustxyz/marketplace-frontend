// eslint-disable-next-line @typescript-eslint/no-var-requires
const env = require("dotenv").config({
  path: ".env",
}).parsed;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("@cypress/code-coverage/task")(on, config);

      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });

      return config;
    },
  },
  env: {
    hasuraAdminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    githubAccessTokenForE2eTestsUsers: process.env.GITHUB_PAT_FOR_E2E_TESTS_USERS,
    ...env,
  },
  video: false,
  defaultCommandTimeout: 15000,
  chromeWebSecurity: false,
  viewportHeight: 800,
  viewportWidth: 1280,
});
