import "./common";

Cypress.Commands.add(
    "requestPayment",
    (requestor, budgetId, amount, recipient_github_user_id, reason) => {
        return cy
            .requestPaymentNoassert(
                requestor,
                budgetId,
                amount,
                recipient_github_user_id,
                reason
            )
            .data("requestPayment")
            .should("be.a", "string");
    }
);

Cypress.Commands.add(
    "requestPaymentNoassert",
    (requestor, budgetId, amount, recipient_github_user_id, reason) => {
        return cy.graphqlAsUser(
            requestor,
            `mutation {
        requestPayment(amountInUsd: ${amount}, budgetId: "${budgetId}", recipientId: ${recipient_github_user_id}, reason: "${reason}")
      }
      `
        );
    }
);
