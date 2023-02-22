import { WAIT_SHORT } from "./common";

Cypress.Commands.add("requestPayment", (projectId, amount, recipientId, reason) => {
  return {
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
  };
});

Cypress.Commands.add("cancelPaymentRequest", (projectId, paymentId) => {
  return {
    query: `mutation($projectId: Uuid!, $paymentId: Uuid!) {
                cancelPaymentRequest(projectId: $projectId, paymentId: $paymentId)
            }`,
    variables: {
      projectId,
      paymentId,
    },
    wait: WAIT_SHORT,
  };
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
    return {
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
    };
  }
);

Cypress.Commands.add(
  "addFiatPaymentReceipt",
  (projectId, paymentId, amount, currencyCode, recipientIban, transactionReference) => {
    return {
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
    };
  }
);
