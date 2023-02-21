describe("As a visitor, I", () => {
  beforeEach(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558)
      .then(user => {
        cy.createProjectWithLeader(user, "Croute A", 1000, this.repos.A.id)
        cy.createProjectWithLeader(user, "Yolo B", 1000, this.repos.B.id)
      });
  });

  it("can filter projects by technology", function () {
    cy.visit(`http://localhost:5173/`);

    cy.contains('Rust').click();
    cy.contains('Croute A');
    cy.contains('Yolo B').should('not.exist');;
  });
});
