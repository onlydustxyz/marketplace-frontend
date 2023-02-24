describe("As a project leader, I", () => {
  let projectId;
  let leader;

  before(() => {
    cy.createGithubUser(12345).then(user => {
      cy.createProject("Project with budget")
        .withLeader(user)
        .withBudget(1000)
        .withRepo()
        .then($projectId => {
          projectId = $projectId;
          leader = user;
        });
    });
  });

  it("can request a payment from a project I lead", function () {
    cy.createGithubUser(55000).then(() => {
      cy.requestPayment(projectId, 500, 55000, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
        .asRegisteredUser(leader)
        .data("requestPayment")
        .then(paymentId => {
          cy.paymentRequestShouldExist(paymentId);
        })
        .then(() => {
          cy.graphql({
            query: `
                query($projectId: uuid!) {
                    projectsByPk(id:$projectId) {
                        budgets {
                            remainingAmount
                        }
                    }
                }`,
            variables: { projectId },
          })
            .asAdmin()
            .data("projectsByPk.budgets")
            .its(0)
            .its("remainingAmount")
            .should("equal", 500);
        });
    });
  });
});
