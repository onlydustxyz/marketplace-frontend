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

export type PaymentRequest = Omit<Payment, "items"> &
  PaymentItem & {
    id: string;
  };

Cypress.Commands.add("populatePayments", function () {
  cy.get("@users").then((_users: any) => {
    const users = new Map<string, User>(Object.entries(_users));

    cy.get("@projects").then((_projects: any) => {
      const projects = new Map<string, Project>(Object.entries(_projects));

      cy.fixture("payments.json").then((payments: Payment[]) => {
        const augmented_payments = new Map<string, Map<number, PaymentRequest[]>>();

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

          if (!augmented_payments.has(payment.project)) {
            augmented_payments.set(payment.project, new Map<number, PaymentRequest[]>());
          }
          if (!augmented_payments.get(payment.project).has(payment.recipientGithubId)) {
            augmented_payments.get(payment.project).set(payment.recipientGithubId, []);
          }

          for (const paymentItem of payment.items) {
            cy.requestPayment(project.id, paymentItem.amount, payment.recipientGithubId, paymentItem.reason)
              .asRegisteredUser(requestor)
              .data("requestPayment")
              .then(paymentId => {
                const payment_request = { ...payment, ...paymentItem, id: paymentId, items: undefined };
                augmented_payments.get(payment.project).get(payment.recipientGithubId).push(payment_request);
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

        cy.then(() => {
          let serializable_payment_requests: any = Object.fromEntries(augmented_payments);
          for (const key in serializable_payment_requests) {
            serializable_payment_requests[key] = Object.fromEntries(serializable_payment_requests[key]);
          }
          cy.writeFile("cypress/fixtures/__generated/payment_requests.json", serializable_payment_requests);
          cy.wrap(serializable_payment_requests).as("paymentRequests");
        });
      });
    });
  });
});
