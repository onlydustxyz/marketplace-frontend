describe("As a simple user, I", () => {
    let projectId;
    let budgetId;

    const STARKONQUEST_ID = 481932781;

    before(() => {
        cy.createUser().then(($user) =>
            cy
                .createProject(
                    $user.id,
                    "Project with budget",
                    1000,
                    STARKONQUEST_ID
                )
                .then(($projectId) => {
                    cy.getProjectBudget($user, $projectId)
                        .its("body.data.projectsByPk.budgets")
                        .its(0)
                        .its("id")
                        .should("be.a", "string")
                        .then(($budgetId) => {
                            projectId = $projectId;
                            budgetId = $budgetId;
                        });
                })
        );
    });

    it("can't request a payment", () => {
        cy.createUser().then((user) => {
            cy.requestPaymentNoassert(user, budgetId, "500", user, {})
                .its("body.errors")
                .its(0)
                .its("message")
                .should("eq", "User is not authorized to perform this action");
        });
    });

    // it("can't get project's budget", () => {
    //     cy.createUser().then(user => {
    //         cy.getProjectBudget(user, projectId)
    //             .its('body.errors')
    //             .its(0)
    //             .its('message')
    //             .should('eq', 'missing session variable: "x-hasura-projects_leaded"')
    //     });
    // });

    it("can fetch github repository details from a project", () => {
        cy.createUser().then((user) => {
            cy.graphqlAsUser(
                user,
                `{
                projectsByPk(id: "${projectId}") {
                  githubRepo {
                    id
                    name
                    owner
                    contributors {
                      id
                      login
                      avatarUrl
                    }
                  }
                  }
              }`
            )
                .its("body.data.projectsByPk.githubRepo")
                .then((repo) => {
                    expect(repo.id).equal(STARKONQUEST_ID);
                    expect(repo.name).equal("starkonquest");
                    expect(repo.owner).equal("onlydustxyz");
                    expect(repo.contributors).to.be.an("array");
                    expect(repo.contributors[0]).to.have.all.keys([
                        "id",
                        "login",
                        "avatarUrl",
                    ]);
                });
        });
    });
});
