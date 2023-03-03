Cypress.Commands.add("populatePayments", function () {
  cy.get("@users").then(users => {
    cy.get("@projects").then(projects => {
      cy.fixture("payments.json").then(payments => {
        for (const payment of payments) {
          const project = projects[payment.project];
          if (!project) {
            throw new Error(`Project ${payment.project} does not exist in projects fixture`);
          }

          const requestor = users[payment.requestor];
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
                for (const receipt of paymentItem.receipts) {
                  if (receipt.transactionHash) {
                    cy.addEthPaymentReceipt(
                      project.id,
                      paymentId,
                      `${receipt.amount}`,
                      receipt.currencyCode,
                      receipt.recipientIdentity,
                      receipt.transactionHash
                    )
                      .asAdmin()
                      .data("addEthPaymentReceipt");
                  } else {
                    cy.addFiatPaymentReceipt(
                      project.id,
                      paymentId,
                      `${receipt.amount}`,
                      receipt.currencyCode,
                      receipt.recipientIban,
                      receipt.transactionReference
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
