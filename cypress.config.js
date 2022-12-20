require("dotenv").config({
  path: ".env",
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
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
  },
});
