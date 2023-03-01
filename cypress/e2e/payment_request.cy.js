import { WAIT_LONG } from "../support/commands/common";

const TEST_ETH_ADDRESS = "0x3cd05ab88fbf996c0784e54f74195815bfa866de";

describe("As a project lead, I", () => {
  beforeEach(function () {
    cy.createGithubUser(98735558)
      .as("user")
      .then(user => {
        cy.createGithubUser(21149076)
          .as("otherUser")
          .then(otherUser => {
            cy.createProject("Project with budget")
              .withLeader(user)
              .withLeader(otherUser)
              .withBudget(1000)
              .withRepo()
              .as("projectId");

            cy.signinUser(user)
              .then(user => JSON.stringify(user.session))
              .as("token");

            cy.signinUser(otherUser)
              .then(user => JSON.stringify(user.session))
              .as("otherToken");
          });
      });

    cy.createGithubUser(43467246)
      .as("paymentRecipient")
      .then(user =>
        cy
          .signinUser(user)
          .then(user => JSON.stringify(user.session))
          .as("paymentRecipientToken")
      );
  });

  it("can request a payment", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.contains("Payments").click();
    cy.get("#remainingBudget").should("have.text", "$1,000");

    cy.contains("New payment").click();
    cy.get("[name=contributorHandle]").type("AnthonyBuisset");
    cy.get("[name=contributorHandle]").blur();
    cy.get("[name=linkToIssue]").type("https://github.com/od-mocks/cool-repo-A/pull/2");
    cy.wait(WAIT_LONG);
    cy.contains("Confirm payment").click();

    cy.get("#remainingBudget").should("have.text", "$0");
  });

  it("can request a payment and other project leads can see the update", function () {
    const showPaymentsAsOtherLeader = () => {
      cy.visit(`http://localhost:5173/projects/${this.projectId}`, {
        onBeforeLoad(win) {
          win.localStorage.setItem("hasura_token", this.otherToken);
        },
      });

      cy.contains("Payments").click();
    };

    // 1. Request a payment, payment is "pending"
    cy.visit(`http://localhost:5173/projects/${this.projectId}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.contains("Payments").click();
    cy.get("#remainingBudget").should("have.text", "$1,000");

    cy.contains("New payment").click();
    cy.get("[name=contributorHandle]").type("AnthonyBuisset");
    cy.get("[name=contributorHandle]").blur();
    cy.get("[name=linkToIssue]").type("https://github.com/od-mocks/cool-repo-A/pull/2");
    cy.wait(WAIT_LONG);
    cy.contains("Confirm payment").click();

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Pending");

    // 2. Edit profile info, payment is "processing"
    cy.visit("http://localhost:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.paymentRecipientToken);
      },
    });

    cy.get("[name=ethIdentity]").clear().type(TEST_ETH_ADDRESS);
    cy.contains("Save profile").click();

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Processing");

    // 3. Add receipt, payment is "complete"
    cy.graphql({
      query: `{ paymentRequests(where: {budget: {projectId: {_eq: "${this.projectId}"}}, _and: {recipientId: {_eq: 43467246}}})
	    {
	  id
  }
          }`,
    })
      .asAdmin()
      .data("paymentRequests")
      .its(0)
      .its("id")
      .then(paymentId =>
        cy
          .addEthPaymentReceipt(
            this.projectId,
            paymentId,
            "1000",
            "USDC",
            {
              type: "ETHEREUM_ADDRESS",
              optEthAddress: TEST_ETH_ADDRESS,
            },
            "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          )
          .asAdmin()
          .data("addEthPaymentReceipt")
          .then(receipt_id => {
            cy.paymentRequestShouldBePaid(paymentId, receipt_id);
          })
      );

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Complete");
  });

  it("can accept an invitation to become project lead", function () {
    cy.createProject("Project without invite").withBudget(500);
    cy.createProject("Project without invite").withBudget(500);
    cy.createProject("Project with invite")
      .withBudget(500)
      .withRepo()
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
