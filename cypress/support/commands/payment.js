import { WAIT_SHORT } from "./common";


Cypress.Commands.add(
    "requestPayment",
    (projectId, amount, recipientId, reason) => {
        return {
            query: `mutation($amount: Int!, $projectId: Uuid!, $recipientId: Int!, $reason: Reason!) {
                requestPayment(amountInUsd: $amount, projectId: $projectId, recipientId: $recipientId, reason: $reason)
            }`,
            variables: {
                amount,
                projectId,
                recipientId,
                reason
            },
            wait: WAIT_SHORT,
        };
    }
);

Cypress.Commands.add(
    "cancelPaymentRequest",
    (projectId, paymentId) => {
        return {
            query: `mutation($projectId: Uuid!, $paymentId: Uuid!) {
                cancelPaymentRequest(projectId: $projectId, paymentId: $paymentId)
            }`,
            variables: {
                projectId,
                paymentId
            },
            wait: WAIT_SHORT,
        };
    }
);

Cypress.Commands.add(
    "paymentRequestShouldExist",
    (paymentId) => {
        return cy.graphql({query: `{
            paymentRequestsByPk(id: "${paymentId}") {
                id
            }
        }`})
        .asAdmin()
        .data("paymentRequestsByPk.id")
        .should("be.a", "string");
    }
);

Cypress.Commands.add(
    "paymentRequestShouldNotExist",
    (paymentId) => {
        return cy.graphql({query: `{
            paymentRequestsByPk(id: "${paymentId}") {
                id
            }
        }`})
        .asAdmin()
        .should("have.nested.property", "body.data.paymentRequestsByPk")
        .should("be.null");
    }
);

Cypress.Commands.add(
    "paymentRequestShouldBePaid",
    (paymentRequestId, paymentId) => {
        return cy.graphql({query: `{
            paymentRequestsByPk(id: "${paymentRequestId}") {
              payments {
                id
              }
            }
          }`})
        .asAdmin()
        .data("paymentRequestsByPk")
        .should("deep.equal", { payments:
            [{"id": paymentId}]
        });
    }
);

Cypress.Commands.add(
    "addEthPaymentReceipt",
    (amount, currencyCode, paymentId, recipientIdentity, transactionHash) => {
        return {
            query: `mutation($amount:String!, $currencyCode:String!, $paymentId:Uuid!, $recipientIdentity:EthereumIdentityInput!, $transactionHash:String!) {
                addEthPaymentReceipt(amount: $amount, currencyCode: $currencyCode, paymentId: $paymentId, recipientIdentity: $recipientIdentity, transactionHash: $transactionHash)
              }`,
            variables: {
                amount,
                currencyCode,
                paymentId,
                recipientIdentity,
                transactionHash
            },
            wait: WAIT_SHORT,
        };
    }
);
