Cypress.Commands.add("dumpDB", function () {
  cy.exec('pg_dump --clean "${DATABASE_URL}" > "cypress/marketplace_db_dump"').its("code").should("eq", 0);
});

Cypress.Commands.add("restoreDB", function () {
  cy.exec('psql "${DATABASE_URL}" < "cypress/marketplace_db_dump"').its("code").should("eq", 0);
});

Cypress.Commands.add("cleanupDB", function () {
  cy.exec('rm -f "cypress/marketplace_db_dump"').its("code").should("eq", 0);
  cy.exec('psql "${DATABASE_URL}" -f "cypress/support/commands/populate/truncate.sql"').its("code").should("eq", 0);
});
