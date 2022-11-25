describe("As an admin, on retool, I", () => {
    it("can create projects", () => {
        const projectName = "Cypress test project";

        cy.createProject(projectName)
            .then($project_id => {
                // Let the event sourcing magic happen
                cy.wait(500);

                cy.request("POST", "/v1/graphql", {
                    query: `{ projects(where: {id: {_eq: "${$project_id}"}}) { name } }`,
                })
                    .its("body")
                    .should("deep.equal", {
                        data: {
                            projects: [{ name: projectName }],
                        },
                    });
            });
    });

    it('can assign a leader to a project', () => {
        cy.createProject('A leaded project').then(projectId => {
            cy.createUser().then(userId => {
                cy.addProjectLead(projectId, userId).then(() => {
                    // Let the event sourcing magic happen
                    cy.wait(500);

                    cy.graphql(`{
                        projects_by_pk(id: "${projectId}") {
                          project_leads {
                            user_id
                          }
                        }
                      }`)
                        .its('body.data.projects_by_pk.project_leads')
                        .its(0)
                        .its('user_id')
                        .should('equal', userId);
                })
            })
        });
    });
});
