require("dotenv").config({
    path: "../.env",
});
const fs = require('fs');
const config = require('toml-js').parse(fs.readFileSync('../App.toml'));
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL,
    },
    env: {
        hasuraAdminSecret: config.hasura.graphql_admin_secret,
    },
});
