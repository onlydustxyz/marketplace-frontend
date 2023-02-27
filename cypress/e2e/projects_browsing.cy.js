describe("As a visitor, I", () => {
  before(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Croute A").withLeader(user).withBudget(500).withRepo(this.repos.A.id);
      cy.createProject("Yolo B").withLeader(user).withBudget(500).withRepo(this.repos.B.id);
      cy.createProject("Plop AB").withLeader(user).withBudget(500).withRepo(this.repos.A.id).withRepo(this.repos.B.id);
    });
  });

  it("can filter projects by technology", function () {
    cy.visit("http://localhost:5173/");

    // Projects
    cy.contains("Croute A");
    cy.contains("Yolo B");
    cy.contains("Plop AB");
    cy.contains("2 contributors");
    cy.contains("3 contributors");

    // Filtering
    cy.contains("Rust");
    cy.contains("HTML");

    // Test filter
    cy.contains("Rust").click();
    cy.contains("Croute A");
    cy.contains("Yolo B").should("not.exist");
    cy.contains("Plop AB");
  });
});
