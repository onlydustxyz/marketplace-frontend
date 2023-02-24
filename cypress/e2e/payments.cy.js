const PROJECT_LEAD_GITHUB_ID = 73634734;
const CONTRIBUTOR_GITHUB_ID = 373646343;

describe("As a contributor, I", () => {
  beforeEach(function () {
    cy.createGithubUser(PROJECT_LEAD_GITHUB_ID).then(user => {
      cy.createProject("Project with budget", 1000)
        .withLeader(user)
        .withRepo()
        .then(projectId => {
          cy.requestPayment(projectId, 200, CONTRIBUTOR_GITHUB_ID, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/3"],
          })
            .asRegisteredUser(user)
            .data();
        });
    });

    cy.createGithubUser(CONTRIBUTOR_GITHUB_ID).then(user => {
      cy.signinUser(user)
        .then(user => JSON.stringify(user.session))
        .as("token");
    });
  });

  it("can see the list of my payments", function () {
    cy.visit(`http://127.0.0.1:5173`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.contains("Payments").click();

    cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(3)").should("have.text", "$200");
      cy.get("td:nth-child(4)").should(
        "have.text",
        "Payout info missing" + "Fill in your payment information to get paid"
      );
    });

    cy.fillPayoutSettings(this.token);

    cy.contains("Payments").click();

    cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(3)").should("have.text", "$200");
      cy.get("td:nth-child(4)").should("have.text", "Processing" + "Payment is being processed by our team");
    });
  });
});
