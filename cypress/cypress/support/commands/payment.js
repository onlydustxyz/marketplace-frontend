import "./common";

Cypress.Commands.add(
    "requestPayment",
    (budgetId, amount, recipient_github_user_id, reason) => {
        return `mutation {
                requestPayment(amountInUsd: ${amount}, budgetId: "${budgetId}", recipientId: ${recipient_github_user_id}, reason: "${reason}")
            }`;
    }
);
