describe("As a simple user, I", () => {
    let projectId;
    let leader;
    let budgetId;

    before(() => {
        cy.createUser().then($user =>
            cy.createProject($user.id, 'Project with budget', 1000).then($projectId => {
                cy.getProjectBudget($user, $projectId)
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
        )
    });

    it("can't request a payment", () => {
        cy.createUser().then($user => {
            cy.requestPayment_noassert($user, budgetId, '500', $user, {})
                .its('body.errors')
                .its(0)
                .its('message')
                .should('eq', 'User is not authorized to perform this action')
        });
    });

    it("can't get project's budget", () => {
        cy.createUser().then($user => {
            cy.getProjectBudget($user, projectId)
                .its('body.errors')
                .its(0)
                .its('message')
                .should('eq', 'missing session variable: "x-hasura-projects_leaded"')
        });
    });
});
