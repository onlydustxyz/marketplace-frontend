import "./common";

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
            }
        };
    }
);
