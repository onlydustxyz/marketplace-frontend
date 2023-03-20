import { Project } from "../support/commands/populate/projects";
import { User } from "../support/commands/populate/users";

describe("As a visitor, I", () => {
  let kakarot: Project;
  let projectA: Project;
  let projectB: Project;
  let empty: Project;

  beforeEach(function () {
    let unused: Project;
    [kakarot, projectA, projectB, unused, empty] = Object.values(this.projects);
  });

  it("can filter projects by technology", function () {
    cy.visitApp();

    // Projects
    cy.contains(kakarot.name);
    cy.contains(projectB.name);
    cy.contains(empty.name);
    cy.contains(projectA.name)
      .should("exist")
      .closest("a")
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14623987721662397761.png");

    cy.contains("3 contributors");
    cy.contains("2 contributors");

    cy.contains("1 repository");
    cy.contains("2 repositories");

    // Filtering
    cy.contains("Rust");
    cy.contains("HTML");

    // Test filter
    cy.contains("Rust").click();
    cy.contains(projectA.name);
    cy.contains(projectB.name).should("not.exist");
    cy.contains(empty.name).should("not.exist");

    // Clear filters
    cy.contains("Clear all").click();
    cy.contains(kakarot.name);
    cy.contains(projectB.name);
    cy.contains(empty.name);
    cy.contains(projectA.name);
  });

  it("can filter projects by sponsor", function () {
    cy.visitApp();

    // Projects
    cy.contains(kakarot.name);
    cy.contains(projectB.name);
    cy.contains(empty.name);
    cy.contains(projectA.name);

    // Filtering
    cy.contains("StarkNet");
    cy.contains("Ether Foundation");

    // Test filter
    cy.contains("StarkNet").click();
    cy.contains(kakarot.name);
    cy.contains(projectA.name);
    cy.contains(projectB.name);
    cy.contains(empty.name).should("not.exist");

    // Clear filters
    cy.contains("Clear all").click();
    cy.contains(kakarot.name);
    cy.contains(projectA.name);
    cy.contains(projectB.name);
    cy.contains(empty.name);
  });

  it("cannot access restricted projects page", function () {
    cy.visitApp({ path: `projects/${projectA.id}/payments` });
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(`/projects/${projectA.id}`);
    });
  });
});

describe("As a registered user, I", () => {
  let user: User;
  let project: Project;

  beforeEach(function () {
    user = this.users["Anthony"];
    project = this.projects["Project A"];
  });

  it("cannot access restricted projects page", function () {
    cy.visitApp({ path: `projects/${project.id}/payments`, token: user.token });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(`/projects/${project.id}`);
    });
  });
});
