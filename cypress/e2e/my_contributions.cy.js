const PROJECT_LEAD_GITHUB_ID = 73634734;
const CONTRIBUTOR_GITHUB_ID = 373646343;

describe("As a contributor, I", () => {
    beforeEach(function() {
        cy.createUser().withGithubProvider(PROJECT_LEAD_GITHUB_ID).then(user => {
            cy.createProject(user.id, "Project with budget", 1000, 493591124)
                .asAdmin()
                .data('createProject').then( projectId =>
                    cy.getProjectBudget(projectId)
                        .asRegisteredUser(user)
                        .data("projectsByPk.budgets")
                        .its(0)
                        .its("id")
                        .should("be.a", "string")
                        .then(budgetId =>
                            cy.requestPayment(budgetId, 200, CONTRIBUTOR_GITHUB_ID, "{}")
                            .asRegisteredUser(user)
                            .data())
                )
        });

        cy.createUser().withGithubProvider(CONTRIBUTOR_GITHUB_ID).then(user => {
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        });
    });

    it("can see the list of my payments", function() {
        console.log(this.token);
        cy.visit(`http://localhost:5173`, {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.contains("My contributions").click();

        cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
            cy.get("td:nth-child(2)").should("have.text", "200 USD ");
            cy.get("td:nth-child(3)").should("have.text", "Processing");
          });
    });
});
