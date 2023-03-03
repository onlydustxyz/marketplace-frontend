describe("As a visitor, I", () => {
  before(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Croute A").withLeader(user).withBudget(500).withRepo(this.repos.A.id).as("projectId");
      cy.createProject("Yolo B").withLeader(user).withBudget(500).withRepo(this.repos.B.id);
      cy.createProject(
        "Plop AB With Logo",
        "https://t.me/plopab",
        "https://avatars.githubusercontent.com/u/121887739?v=4"
      )
        .withLeader(user)
        .withBudget(500)
        .withRepo(this.repos.A.id)
        .withRepo(this.repos.B.id);
    });
  });

  it("can filter projects by technology", function () {
    cy.visit("http://localhost:5173/");

    // Projects
    cy.contains("Croute A");
    cy.contains("Yolo B");
    cy.contains("Plop AB With Logo")
      .should("exist")
      .closest("a")
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14623987721662397761.png");
    cy.contains("2 contributors");
    cy.contains("3 contributors");
    cy.contains("1 repository");
    cy.contains("2 repositories");

    // Filtering
    cy.contains("Rust");
    cy.contains("HTML");

    // Test filter
    cy.contains("Rust").click();
    cy.contains("Croute A");
    cy.contains("Yolo B").should("not.exist");
    cy.contains("Plop AB With Logo");

    // Clear filters
    cy.contains("Clear all").click();
    cy.contains("Croute A");
    cy.contains("Yolo B");
    cy.contains("Plop AB");
    cy.contains("2 contributors");
    cy.contains("3 contributors");
    cy.contains("1 repository");
    cy.contains("2 repositories");
  });

  it("cannot access restricted projects page", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}/payments`);
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(`/projects/${this.projectId}`);
    });
  });
});

describe("As a registered user, I", () => {
  before(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Croute A").withLeader(user).withBudget(500).withRepo(this.repos.A.id).as("projectId");
      cy.createProject("Yolo B").withLeader(user).withBudget(500).withRepo(this.repos.B.id);
      cy.createProject("Plop AB").withLeader(user).withBudget(500).withRepo(this.repos.A.id).withRepo(this.repos.B.id);
    });
    cy.createGithubUser(123456).as("token");
  });

  it("cannot access restricted projects page", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}/payments`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(`/projects/${this.projectId}`);
    });
  });
});
