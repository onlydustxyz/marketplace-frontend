require("dotenv").config({
  path: ".env",
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
    },
  },
  env: {
    hasuraAdminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});
