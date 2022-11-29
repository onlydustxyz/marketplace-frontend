describe("As a project leader, I", () => {
    let projectId;
    let leader;
    let budgetId;

    before(() => {
        cy.createProject('Project with budget', 1000).then($projectId =>
            cy.createUser().then($user => {
                cy.addProjectLead($projectId, $user.id).then(() => {
                    cy.graphqlAs($user, `{
                        projects_by_pk(id: "${$projectId}") {
                            budgets {
                                id
                            }
                        }
                    }`)
                        .its('body.data.projects_by_pk.budgets')
                        .its(0)
                        .its('id')
                        .should('be.a', 'string')
                        .then($budgetId => {
                            projectId = $projectId;
                            leader = $user;
                            budgetId = $budgetId;
                        })
                })
            })
        )
    });

    it("can request a payment", () => {
        cy.createUser().then(contributor => {
            cy.requestPayment(leader, budgetId, '500', contributor, {}).then(paymentId => {
                cy.wait(500);
                cy.graphqlAsAdmin(`{
                    payment_requests_by_pk(id: "${paymentId}") {
                      id
                    }
                  }`)
                    .its('body.data.payment_requests_by_pk.id')
                    .should('be.a', 'string');
            })
        });
    });


    it("anyone cannot request a payment", () => {
        cy.createUser().then(contributor => {
            cy.graphqlAs(contributor, `mutation {
                requestPayment(amountInUsd: 500, budgetId: "${budgetId}", recipientId: "${contributor.id}", requestorId: "${contributor.id}", reason: "{}")
              }
              `).its('body.errors').should($errors => {
                expect($errors).to.have.length(1);
                expect($errors[0].message).to.equal('User is not authorized to perform the action');
                expect($errors[0].extensions.reason).to.equal('Project leader role required');

            })
        });
    });
});
