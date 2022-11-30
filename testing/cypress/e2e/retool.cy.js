describe("As an admin, on retool, I", () => {
    it("can create projects", () => {
        const projectName = "Cypress test project";

        cy.createProject(projectName, 500, 1234)
            .then($projectId => {
                // Let the event sourcing magic happen
                cy.wait(500);

                cy.graphql(`{
                    projects_by_pk(id: "${$projectId}") {
                      project_details {
                        github_repo_id
                      }
                    }
                  }`)
                    .its('body.data.projects_by_pk.project_details')
                    .its('github_repo_id')
                    .should('equal', 1234);
            });
    });

    it('can assign a leader to a project', () => {
        cy.createProject().then($projectId => {
            cy.createUser().then($user => {
                cy.addProjectLead($projectId, $user.id).then(() => {
                    // Let the event sourcing magic happen
                    cy.wait(500);

                    cy.graphql(`{
                        projects_by_pk(id: "${$projectId}") {
                          project_leads {
                            user_id
                          }
                        }
                      }`)
                        .its('body.data.projects_by_pk.project_leads')
                        .its(0)
                        .its('user_id')
                        .should('equal', $user.id);
                })
            })
        });
    });
});
