Cypress.Commands.add("populateAll", function () {
  cy.populateUsers().then(users => {
    cy.populateProjects(users);
  });
});
