const fs = require('fs');
const config = require('toml-js').parse(fs.readFileSync('../App.toml'));
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: config.cypress.base_url,
    },
    env: {
        hasuraAdminSecret: config.hasura.graphql_admin_secret,
    },
});
