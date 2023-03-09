import { Project } from "./projects";
import { PayoutIdentity, PayoutIdentityType, User, UserIdentityType } from "./users";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      populatePayments(): Chainable<Payment[]>;
    }
  }
}

export type Payment = {
  project: string;
  recipientGithubId: number;
  requestor: string;
  items: PaymentItem[];
};

export type PaymentItem = {
  amount: number;
  reason: PaymentReason;
  receipts?: PaymentReceipt[];
};

export type PaymentReason = {
  workItems: any[];
};

export type PaymentReceipt = {
  amount: number;
  currencyCode: string;
  recipientIdentity: PayoutIdentity;
  transactionHashOrReference: string;
};

Cypress.Commands.add("populatePayments", function () {
  cy.get("@users").then((_users: any) => {
    const users = new Map<string, User>(Object.entries(_users));

    cy.get("@projects").then((_projects: any) => {
      const projects = new Map<string, Project>(Object.entries(_projects));

      cy.fixture("payments.json").then((payments: Payment[]) => {
        for (const payment of payments) {
          const project = projects.get(payment.project);
          if (!project) {
            throw new Error(`Project ${payment.project} does not exist in projects fixture`);
          }

          const requestor = users.get(payment.requestor);
          if (!requestor) {
            throw new Error(`Requestor ${payment.requestor} does not exist in users fixture`);
          }

          if (!project.leaders.includes(payment.requestor)) {
            throw new Error(`Requestor ${payment.requestor} is not a leader of project ${payment.project}`);
          }

          for (const paymentItem of payment.items) {
            cy.requestPayment(project.id, paymentItem.amount, payment.recipientGithubId, paymentItem.reason)
              .asRegisteredUser(requestor)
              .data("requestPayment")
              .then(paymentId => {
                for (const receipt of paymentItem.receipts || []) {
                  if (receipt.recipientIdentity.type === PayoutIdentityType.ETHEREUM_ADDRESS) {
                    cy.addEthPaymentReceipt(
                      project.id,
                      paymentId,
                      `${receipt.amount}`,
                      receipt.currencyCode,
                      receipt.recipientIdentity,
                      receipt.transactionHashOrReference
                    )
                      .asAdmin()
                      .data("addEthPaymentReceipt");
                  } else {
                    cy.addFiatPaymentReceipt(
                      project.id,
                      paymentId,
                      `${receipt.amount}`,
                      receipt.currencyCode,
                      receipt.recipientIdentity.optBankAddress.IBAN,
                      receipt.transactionHashOrReference
                    )
                      .asAdmin()
                      .data("addFiatPaymentReceipt");
                  }
                }
              });
          }
        }
      });
    });
  });
});
