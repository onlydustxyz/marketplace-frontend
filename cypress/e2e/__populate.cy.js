describe("Once and before all test suites, ", () => {
  it("cleanup and populate some data", function () {
    cy.cleanupDB();
    cy.populateAll();
    cy.dumpDB();
  });
});
