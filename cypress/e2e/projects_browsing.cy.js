describe("As a visitor, I", () => {
  beforeEach(function () {
    cy.createGithubUser(98735558)
      .then(user => {
        cy.createProjectWithLeader(user, "Starkonquest", 1000, 481932781)
        cy.createProjectWithLeader(user, "Marketplace", 1000, 498695724)
      });
  });

  it("can filter projects by technology", function () {
    cy.visit(`http://localhost:5173/`);

    cy.get('[data-testid="technologies-filter-dropdown"]').click();
    cy.contains('Cairo').click();
    cy.contains('Starkonquest');
    cy.contains('Marketplace').should('not.exist');;
  });
});
