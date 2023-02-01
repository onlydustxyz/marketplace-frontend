import { WAIT_LONG } from "../support/commands/common";

describe("As a project lead, I", () => {
  beforeEach(function () {
    cy.createGithubUser(98735558)
      .as("user")
      .then(user => {
        cy.createProjectWithLeader(user, "Project with budget", 1000, 493591124)
          .as("projectId");
        cy.signinUser(user)
          .then(user => JSON.stringify(user.session))
          .as("token");
      });
  });

  it("can request a payment", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.contains("Payments").click();
    cy.get("#remainingBudget").should("have.text", "$1000");

    cy.contains("Submit payment").click();
    cy.get("[name=contributor").type("AnthonyBuisset");
    cy.get("[name=linkToIssue").type("https://github.com/onlydustxyz/starkonquest/pull/68");
    cy.wait(WAIT_LONG);
    cy.contains("Confirm payment").click();

    cy.get("#remainingBudget").should("have.text", "$0");
  });

  it("can accept an invitation to become project lead", function () {
    cy.createProject("Project without invite").asAdmin();
    cy.createProject("Project without invite").asAdmin();
    cy.createProject("Project with invite").asAdmin().data("createProject")
        .then(projectId => cy.inviteProjectLeader(projectId, this.user.githubUserId).asAdmin());

    cy.visit("http://localhost:5173/", {
        onBeforeLoad(win) {
            win.localStorage.setItem("hasura_token", this.token);
        },
    });

    cy.get('[data-testid="project-card"]').first().click();
    cy.get('[data-testid="accept-invite-button"]').click();

    cy.get('[data-testid="Payments-tab"]');
  });
});
