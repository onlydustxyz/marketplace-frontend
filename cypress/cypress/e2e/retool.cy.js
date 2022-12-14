describe("As an admin, on retool, I", () => {
    it("can create a project", () => {
        const projectName = "Cypress test project";

        cy.createUser().then((user) => {
            cy.createProject(user.id, projectName, 500, 1234)
                .asAdmin()
                .data("createProject")
                .then((projectId) => {
                    // Let the event sourcing magic happen
                    cy.wait(500);

                    cy.graphql(
                        `{
                    projectsByPk(id: "${projectId}") {
                      githubRepoId
                    }
                  }`
                    )
                        .asAnonymous()
                        .data("projectsByPk")
                        .its("githubRepoId")
                        .should("equal", 1234);

                    cy.graphql(
                        `{
                        projectsByPk(id: "${projectId}") {
                          projectLeads {
                            userId
                          }
                        }
                      }`
                    )
                        .asAnonymous()
                        .data("projectsByPk.projectLeads")
                        .its(0)
                        .its("userId")
                        .should("equal", user.id);

                    cy.graphql(
                        `{
                    projects(where: {id: {_eq: "${projectId}"}}) {
                        name
                    }
                }`
                    )
                        .asAnonymous()
                        .its("body")
                        .should("deep.equal", {
                            data: {
                                projects: [{ name: projectName }],
                            },
                        });
                });
        });
    });

    it("can update project details", () => {
        cy.createUser().then((user) =>
            cy
                .createProject(user.id, "Another project", 500, 1234)
                .asAdmin()
                .data("createProject")
                .then((projectId) =>
                    cy
                        .updateProject(projectId, "new description")
                        .asAdmin()
                        .data()
                        .then(() =>
                            cy
                                .graphql(
                                    `{
                    projectsByPk(id: "${projectId}") {
                      projectDetails {
                        description
                      }
                    }
                  }`
                                )
                                .asAnonymous()
                                .data("projectsByPk.projectDetails")
                                .its("description")
                                .should("equal", "new description")
                        )
                )
        );
    });
});
