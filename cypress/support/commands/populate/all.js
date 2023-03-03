Cypress.Commands.add("populateAll", function () {
  cy.fixture("repos.json").as("repos");

  cy.createGithubUser(111111).then(user => {
    cy.createProject("SSSSSStarkonquest").withLeader(user).withBudget(10000).withRepo();
  });
});
