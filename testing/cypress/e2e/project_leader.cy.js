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
});
