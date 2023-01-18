const PROJECT_LEAD_GITHUB_ID = 73634734;
const CONTRIBUTOR_GITHUB_ID = 373646343;

describe("As a contributor, I", () => {
  beforeEach(function () {
    cy.createGithubUser(PROJECT_LEAD_GITHUB_ID)
      .then(user => {
        cy.createProjectWithLeader(user, "Project with budget", 1000, 493591124)
          .then(projectId => {
            cy.requestPayment(projectId, 200, CONTRIBUTOR_GITHUB_ID, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] }).asRegisteredUser(user).data()
          });
      });

    cy.createGithubUser(CONTRIBUTOR_GITHUB_ID)
      .then(user => {
        cy.signinUser(user)
          .then(user => JSON.stringify(user.session))
          .as("token");
      });
  });

  it("can see the list of my payments", function () {
    console.log(this.token);
    cy.visit(`http://localhost:5173`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.contains("My payments").click();

    cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(3)").should("have.text", "200 USD");
      cy.get("td:nth-child(4)").should("have.text", "Processing");
    });
  });
});
