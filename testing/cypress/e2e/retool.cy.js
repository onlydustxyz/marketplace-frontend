describe("As an admin, on retool, I", () => {
    it('can create a project', () => {
        const projectName = "Cypress test project";

        cy.createUser().then(user => {
            cy.createProject(user.id, projectName, 500, 1234).then(projectId => {
                // Let the event sourcing magic happen
                cy.wait(500);

                cy.graphql(`{
                    projects_by_pk(id: "${projectId}") {
                      github_repo_id
                    }
                  }`)
                    .its('body.data.projects_by_pk')
                    .its('github_repo_id')
                    .should('equal', 1234);

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
                    .should('equal', user.id);

                cy.graphql(`{
                    projects(where: {id: {_eq: "${projectId}"}}) {
                        name
                    }
                }`)
                    .its("body")
                    .should("deep.equal", {
                        data: {
                            projects: [{ name: projectName }],
                        },
                    });
            })
        });
    });

    it('can update project details', () => {
        cy.createUser().then(user =>
            cy.createProject(user.id, 'Another project', 500, 1234).then(projectId =>
                cy.updateProject(projectId, 'new description').then(() =>
                    cy.graphql(`{
                    projects_by_pk(id: "${projectId}") {
                      project_details {
                        description
                      }
                    }
                  }`)
                    .its('body.data.projects_by_pk.project_details')
                    .its('description')
                    .should('equal', 'new description')
                )
            )
        )
    });
});
