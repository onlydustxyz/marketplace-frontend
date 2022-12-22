describe("As an admin, on retool, I", () => {
    it("can create a project", () => {
        const projectName = "Cypress test project";
        const STARKONQUEST_ID = 481932781;

        cy.createUser().then((user) => {
            cy.createProject(user.id, projectName, 500, STARKONQUEST_ID)
                .asAdmin()
                .data("createProject")
                .then((projectId) => {
                    // Let the event sourcing magic happen
                    cy.wait(700);

                    cy.graphql(
                        `{
                    projectsByPk(id: "${projectId}") {
                      githubRepo {
                        id
                        owner
                        name
                        languages
                      }
                    }
                  }`
                    )
                        .asAnonymous()
                        .data("projectsByPk.githubRepo")
                        .then(details => {
                            expect(details.id).to.equal(STARKONQUEST_ID);
                            expect(details.owner).to.equal("onlydustxyz");
                            expect(details.name).to.equal("starkonquest");
                            expect(details.languages).to.be.an("object");
                            expect(details.languages).to.have.property("Cairo");
                        });

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
                .createProject(user.id, "Another project", 500)
                .asAdmin()
                .data("createProject")
                .then((projectId) => {
                    cy.wait(700);
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
                })
        );
    });

    it("can update a project github repository id", () => {
        const FIRST_REPO_ID = 1;
        const SECOND_REPO_ID = 1234;

        cy.createUser().then((user) =>
            cy
                .createProject(user.id, "Another project", 500, FIRST_REPO_ID)
                .asAdmin()
                .data("createProject")
                .then((projectId) => {
                    cy.wait(700);
                    cy
                        .updateProjectGithubRepoId(projectId, SECOND_REPO_ID)
                        .asAdmin()
                        .data()
                        .then(() => {
                            cy.wait(700);
                            cy
                                .graphql(
                                    `{
                    projectsByPk(id: "${projectId}") {
                        githubRepoId
                    }
                  }`
                                )
                                .asAnonymous()
                                .data("projectsByPk")
                                .its("githubRepoId")
                                .should("equal", SECOND_REPO_ID)
                        })
                })
        );
    });

    it("can't create a project with a repository that doesn't exist", () => {
        const projectName = "Cypress test project";
        const UNEXISTING_REPO_ID = 2147466666;

        cy.createUser().then((user) => {
            cy.createProject(user.id, projectName, 500, UNEXISTING_REPO_ID)
                .asAdmin().errors().its(0).its("extensions.reason").should("equal", "Github repository 2147466666 does not exist");
        });
    });

    it("can't update a project with a repository that doesn't exist", () => {
        const FIRST_REPO_ID = 1;
        const UNEXISTING_REPO_ID = 2147466666;

        cy.createUser().then((user) =>
            cy
                .createProject(user.id, "Another project", 500, FIRST_REPO_ID)
                .asAdmin()
                .data("createProject")
                .then((projectId) => {
                    cy.wait(700);
                        cy.updateProjectGithubRepoId(projectId, UNEXISTING_REPO_ID)
                            .asAdmin().errors().its(0).its("extensions.reason").should("equal", "Github repository 2147466666 does not exist");
                })
        );
    });
});
