// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Code coverage support
import "@cypress/code-coverage/support";

// Import commands.js using ES2015 syntax:
import "./commands/common";
import "./commands/user";
import "./commands/payment";
import "./commands/project";
import "./commands/sponsor";
import "./commands/populate/db_utils";
import "./commands/populate/users";
import "./commands/populate/sponsors";
import "./commands/populate/projects";
import "./commands/populate/payments";
import "./commands/populate/all";

export const __POPULATE = "cleanup and populate some data";

// Before each test suite (ie. each test file), restore the DB as it was right after populating data.
before(function () {
  if (Cypress.currentTest.title !== __POPULATE) {
    cy.log("Restoring DB...");
    cy.restoreDB();
  }
});

// Before each test, restore the fixtures created right after populatin data.
beforeEach(function () {
  if (Cypress.currentTest.title !== __POPULATE) {
    cy.log("Restoring fixtures of populated data...");
    cy.fixtureOrDefault("__generated/users.json", "users");
    cy.fixtureOrDefault("__generated/sponsors.json", "sponsors");
    cy.fixtureOrDefault("__generated/projects.json", "projects");
    cy.fixtureOrDefault("__generated/payment_requests.json", "paymentRequests");
  }
});

// Once all tests are done, restore the DB so it is populated as it was before running the first test.
// This lets you have a local DB with some data for your manual tests.
after(function () {
  cy.log("Restoring DB...");
  cy.restoreDB();
});
