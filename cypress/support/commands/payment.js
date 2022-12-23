import "./common";

Cypress.Commands.add(
    "requestPayment",
    (budgetId, amount, recipientId, reason) => {
        return {
            query: `mutation($amount: Int!, $budgetId: Uuid!, $recipientId: Int!, $reason: Reason!) {
                requestPayment(amountInUsd: $amount, budgetId: $budgetId, recipientId: $recipientId, reason: $reason)
            }`,
            variables: {
                amount,
                budgetId,
                recipientId,
                reason
            }
        };
    }
);
