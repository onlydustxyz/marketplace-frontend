describe("As a project leader, I", () => {
    let projectId;
    let leader;

    before(() => {
        cy.createUser().withGithubProvider(12345).then((user) => {
            cy
                .createProject(user.id, "Project with budget", 1000, 1234)
                .asAdmin()
                .data("createProject")
                .then(($projectId) => {
                    projectId = $projectId;
                    leader = user;
                })
        });
    });

    it("can request a payment from a project I lead", () => {
        cy.createUser().then((contributor) => {
            cy.requestPayment(projectId, 500, 55000, { workItems: ["http://link/to/pr"] })
                .asRegisteredUser(leader)
                .data("requestPayment")
                .then((paymentId) => {
                    cy.wait(500);
                    cy.graphql({query: `{
                            paymentRequestsByPk(id: "${paymentId}") {
                      id
                    }
                  }`})
                        .asAdmin()
                        .data("paymentRequestsByPk.id")
                        .should("be.a", "string");
                })
                .then(() => {
                    cy.wait(500);
                    cy.graphql({
                        query: `
                        query($projectId: uuid!) {
                            projectsByPk(id:$projectId) {
                                budgets {
                                    remainingAmount
                                }
                            }
                        }`,
                        variables: { projectId }})
                        .asAdmin()
                        .data("projectsByPk.budgets")
                        .its(0)
                        .its('remainingAmount')
                        .should("equal", 500);
                });
        });
    });
});
