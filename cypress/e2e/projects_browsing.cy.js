describe("As a visitor, I", () => {
  before(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Croute A").withLeader(user).withRepo(this.repos.A.id);
      cy.createProject("Yolo B").withLeader(user).withRepo(this.repos.B.id);
    });
  });

  it("can filter projects by technology", function () {
    cy.visit(`http://localhost:5173/`);

    cy.contains("Rust").click();
    cy.contains("Croute A");
    cy.contains("Yolo B").should("not.exist");
  });
});
