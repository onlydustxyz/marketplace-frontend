import { GraphQLRequest, Uuid, WAIT_SHORT } from "./common";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      requestPayment(projectId: Uuid, amount: number, recipientId: number, reason: object): Chainable<GraphQLRequest>;
      cancelPaymentRequest(projectId: Uuid, paymentId: Uuid): Chainable<GraphQLRequest>;
      paymentRequestShouldExist(paymentId: Uuid): Chainable<any>;
      paymentRequestShouldNotExist(paymentId: Uuid): Chainable<any>;
      paymentRequestShouldBePaid(paymentRequestId: Uuid, paymentId: Uuid): Chainable<any>;
      addEthPaymentReceipt(
        projectId: Uuid,
        paymentId: Uuid,
        amount: string,
        currencyCode: string,
        recipientIdentity: object,
        transactionHash: string
      ): Chainable<GraphQLRequest>;
      addFiatPaymentReceipt(
        projectId: Uuid,
        paymentId: Uuid,
        amount: string,
        currencyCode: string,
        recipientIban: string,
        transactionReference: string
      ): Chainable<GraphQLRequest>;
    }
  }
}

Cypress.Commands.add("requestPayment", (projectId, amount, recipientId, reason) => {
  return cy.wrap({
    query: `mutation($amount: Int!, $projectId: Uuid!, $recipientId: Int!, $reason: Reason!) {
                requestPayment(amountInUsd: $amount, projectId: $projectId, recipientId: $recipientId, reason: $reason)
            }`,
    variables: {
      amount,
      projectId,
      recipientId,
      reason,
    },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("cancelPaymentRequest", (projectId, paymentId) => {
  return cy.wrap({
    query: `mutation($projectId: Uuid!, $paymentId: Uuid!) {
                cancelPaymentRequest(projectId: $projectId, paymentId: $paymentId)
            }`,
    variables: {
      projectId,
      paymentId,
    },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("paymentRequestShouldExist", paymentId => {
  return cy
    .graphql({
      query: `{
            paymentRequestsByPk(id: "${paymentId}") {
                id
            }
        }`,
    })
    .asAdmin()
    .data("paymentRequestsByPk.id")
    .should("be.a", "string");
});

Cypress.Commands.add("paymentRequestShouldNotExist", paymentId => {
  return cy
    .graphql({
      query: `{
            paymentRequestsByPk(id: "${paymentId}") {
                id
            }
        }`,
    })
    .asAdmin()
    .should("have.nested.property", "body.data.paymentRequestsByPk")
    .should("be.null");
});

Cypress.Commands.add("paymentRequestShouldBePaid", (paymentRequestId, paymentId) => {
  return cy
    .graphql({
      query: `{
            paymentRequestsByPk(id: "${paymentRequestId}") {
              payments {
                id
              }
            }
          }`,
    })
    .asAdmin()
    .data("paymentRequestsByPk")
    .should("deep.equal", { payments: [{ id: paymentId }] });
});

Cypress.Commands.add(
  "addEthPaymentReceipt",
  (projectId, paymentId, amount, currencyCode, recipientIdentity, transactionHash) => {
    return cy.wrap({
      query: `mutation($projectId:Uuid!, $paymentId:Uuid!, $amount:String!, $currencyCode:String!, $recipientIdentity:EthereumIdentityInput!, $transactionHash:String!) {
                addEthPaymentReceipt(projectId: $projectId, paymentId: $paymentId, amount: $amount, currencyCode: $currencyCode, recipientIdentity: $recipientIdentity, transactionHash: $transactionHash)
              }`,
      variables: {
        projectId,
        paymentId,
        amount,
        currencyCode,
        recipientIdentity,
        transactionHash,
      },
      wait: WAIT_SHORT,
    });
  }
);

Cypress.Commands.add(
  "addFiatPaymentReceipt",
  (projectId, paymentId, amount, currencyCode, recipientIban, transactionReference) => {
    return cy.wrap({
      query: `mutation($projectId:Uuid!, $paymentId:Uuid!, $amount:String!, $currencyCode:String!, $recipientIban:String!, $transactionReference:String!) {
                addFiatPaymentReceipt(projectId: $projectId, paymentId: $paymentId, amount: $amount, currencyCode: $currencyCode, recipientIban: $recipientIban, transactionReference: $transactionReference)
              }`,
      variables: {
        projectId,
        paymentId,
        amount,
        currencyCode,
        recipientIban,
        transactionReference,
      },
      wait: WAIT_SHORT,
    });
  }
);
