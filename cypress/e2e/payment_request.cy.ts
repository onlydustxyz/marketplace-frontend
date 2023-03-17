import { WAIT_LONG } from "../support/commands/common";
import { Project } from "../support/commands/populate/projects";
import { User } from "../support/commands/populate/users";

const TEST_ETH_ADDRESS = "0x3cd05ab88fbf996c0784e54f74195815bfa866de";

function requestPayment({ contributor, issues }) {
  cy.get("[role=combobox]").type(contributor).wait(WAIT_LONG).type("{enter}");
  cy.get("[data-testid=add-work-item-btn]").click();
  cy.get("[data-testid=add-other-pr-toggle]").click();

  for (const issue of issues) {
    cy.get("[name=otherPrLink]").type(issue);
    cy.get("[data-testid=add-other-pr-btn]").click().wait(WAIT_LONG);
  }

  cy.then(() => {
    cy.get("[data-testid=close-add-work-item-panel-btn]").click();
    cy.contains("Confirm payment").click();
  });
}

describe("As a project lead, I", () => {
  let project: Project;
  let leader1: User;
  let leader2: User;
  let recipient: User;

  beforeEach(function () {
    project = this.projects["Kakarot"];
    leader1 = this.users["TokioRs"];
    leader2 = this.users["Olivier"];
    recipient = this.users["Anthony"];
  });

  it("can request a payment", function () {
    cy.visitApp({ path: `projects/${project.id}/payments`, token: leader1.token });

    cy.get("#remainingBudget").should("have.text", "$50,000");

    cy.contains("New payment").click();
    requestPayment({
      contributor: recipient.github.login,
      issues: ["https://github.com/od-mocks/cool-repo-A/pull/1", "https://github.com/od-mocks/cool-repo-A/pull/2"],
    });
    cy.reload();
    cy.get("#remainingBudget").should("have.text", "$49,000");
  });

  it("can request a payment and other project leads can see the update", function () {
    const showPaymentsAsOtherLeader = () =>
      cy.visitApp({ path: `projects/${project.id}/payments`, token: leader2.token });

    // 1. Request a payment, payment is "pending"
    cy.visitApp({ path: `projects/${project.id}/payments`, token: leader1.token });

    cy.contains("New payment").click();
    requestPayment({
      contributor: recipient.github.login,
      issues: ["https://github.com/od-mocks/cool-repo-A/pull/2"],
    });

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Pending");

    // 2. Edit profile info, payment is "processing"
    cy.fillPayoutSettings(recipient.token);

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Processing");

    // 3. Add receipt, payment is "complete"
    cy.graphql({
      query: `{
        paymentRequests(where: {budget: {projectId: {_eq: "${project.id}"}}, _and: {recipientId: {_eq: ${recipient.github.id}}}}) {
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
            project.id,
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
          .then(receiptId => cy.paymentRequestShouldBePaid(paymentId, receiptId))
      );

    showPaymentsAsOtherLeader();
    cy.get("#payment_table").contains("Complete");
  });
});

describe("As a future project lead, I", () => {
  let project: Project;
  let user: User;

  beforeEach(function () {
    project = this.projects["Project B"];
    user = this.users["Anthony"];
  });

  it("can accept an invitation to become project lead", function () {
    cy.visitApp({ token: user.token });

    cy.get('[data-testid="project-card"]').first().click();
    cy.get('[data-testid="accept-invite-button"]').click();

    cy.get('[data-testid="Payments-tab"]');
  });
});
