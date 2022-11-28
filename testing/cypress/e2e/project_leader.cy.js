describe("As a project leader, I", () => {
    let projectId;
    let leader;
    before(() => {
        cy.createProject('My Project').then($projectId =>
            cy.createUser().then($user => {
                cy.addProjectLead($projectId, $user.id).then(() => {
                    projectId = $projectId;
                    leader = $user;
                })
            })
        )
    });

    it("can request a payment", () => {
        cy.createUser().then(contributor => {
            cy.requestPayment(leader, projectId, '500', contributor, {}).then(paymentId => {
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
                requestPayment(amountInUsd: 500, projectId: "${projectId}", recipientId: "${contributor.id}", requestorId: "${contributor.id}", reason: "{}")
              }
              `).its('body.errors').should($errors => {
                expect($errors).to.have.length(1);
                expect($errors[0].message).to.equal('User is not authorized to perform the action');
                expect($errors[0].extensions.reason).to.equal('Project leader role required');

            })
        });
    });
});
