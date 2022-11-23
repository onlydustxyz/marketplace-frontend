require("dotenv").config({
    path: "../.env",
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL,
    },
    env: {
        hasuraAdminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
});
