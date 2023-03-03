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
import "./commands/payment";
import "./commands/project";
import "./commands/sponsor";
import "./commands/user";
import "./commands/populate/db_utils";
import "./commands/populate/users";
import "./commands/populate/projects";
import "./commands/populate/payments";
import "./commands/populate/all";

// Before all tests, populate and save data
before(function () {
  cy.log("Cleaning up and populating DB...");
  const startTime = new Date();
  cy.cleanupDB();
  cy.populateAll();
  cy.dumpDB();
  const elapsedTime = new Date() - startTime;
  cy.log(`Done in ${elapsedTime}ms`);
});

// Before each test, restore the DB as it was before running the first test.
//
// IMPORTANT: do NOT use before() to populate data in your tests,
// because it will be overriden by this restoration. Use beforeEach() instead.
beforeEach(function () {
  cy.log("Restoring DB...");
  const startTime = new Date();
  cy.restoreDB();
  const elapsedTime = new Date() - startTime;
  cy.log(`Done in ${elapsedTime}ms`);
});

// Once all tests are done, restore the DB so it is populated as it was before running the first test.
// This lets you have a local DB with some data for your manual tests.
after(function () {
  cy.restoreDB();
});
