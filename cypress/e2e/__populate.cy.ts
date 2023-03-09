import { __POPULATE } from "../support/e2e";

describe("Once and before all test suites, ", () => {
  it(__POPULATE, function () {
    cy.cleanupDB();
    cy.populateAll();
    cy.dumpDB();
  });
});
