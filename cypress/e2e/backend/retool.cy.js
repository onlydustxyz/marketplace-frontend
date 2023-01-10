describe("As an admin, on retool, I", () => {
    it("can create a project", () => {
        const projectName = "Cypress test project";
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345).then((user) => {
            cy.createProjectWithLeader(user, projectName, 500, STARKONQUEST_ID)
                .then((projectId) => {
                    // Let the event sourcing magic happen
                    cy.waitEvents();

                    cy.graphql({ query: `{
                    projectsByPk(id: "${projectId}") {
                      githubRepo {
                        id
                        owner
                        name
                        languages
                      }
                    }
                  }`})
                        .asAnonymous()
                        .data("projectsByPk.githubRepo")
                        .then(details => {
                            expect(details.id).to.equal(STARKONQUEST_ID);
                            expect(details.owner).to.equal("onlydustxyz");
                            expect(details.name).to.equal("starkonquest");
                            expect(details.languages).to.be.an("object");
                            expect(details.languages).to.have.property("Cairo");
                        });

                    cy.graphql({ query: `{
                        projectsByPk(id: "${projectId}") {
                          projectLeads {
                            userId
                          }
                        }
                      }`})
                        .asAnonymous()
                        .data("projectsByPk.projectLeads")
                        .its(0)
                        .its("userId")
                        .should("equal", user.id);


                    cy.graphql({ query: `{
                        projectsByPk(id: "${projectId}") {
                            projectDetails {
                                logoUrl
                            }
                        }
                      }`})
                        .asAnonymous()
                        .data("projectsByPk.projectDetails.logoUrl")
                        .should("be.a", "string");

                    cy.graphql({ query: `{
                        projects(where: {id: {_eq: "${projectId}"}}) {
                            name
                        }
                    }`})
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
        cy.createGithubUser(12345).then((user) =>
            cy
                .createProjectWithLeader(user, "Another project", 500)
                .then((projectId) => {
                    cy.waitEvents();
                    cy
                        .updateProject(projectId, "new description")
                        .asAdmin()
                        .data()
                        .then(() =>
                            cy
                                .graphql({ query: `{
                                    projectsByPk(id: "${projectId}") {
                                    projectDetails {
                                        description
                                    }
                                    }
                                }`})
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

        cy.createGithubUser(12344556).then((user) =>
            cy
                .createProjectWithLeader(user, "Another project", 500, FIRST_REPO_ID)
                .then((projectId) => {
                    cy.waitEvents();
                    cy
                        .updateProjectGithubRepoId(projectId, SECOND_REPO_ID)
                        .asAdmin()
                        .data()
                        .then(() => {
                            cy.waitEvents();
                            cy
                                .graphql({ query: `{
                                    projectsByPk(id: "${projectId}") {
                                        githubRepoId
                                    }
                                }`})
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

        cy.createProject(projectName, 500, UNEXISTING_REPO_ID)
            .asAdmin().errors().its(0).its("extensions.reason").should("equal", "Github repository 2147466666 does not exist");
    });

    it("can't update a project with a repository that doesn't exist", () => {
        const FIRST_REPO_ID = 1;
        const UNEXISTING_REPO_ID = 2147466666;

        cy.createGithubUser(1213243).then((user) =>
            cy
                .createProjectWithLeader(user, "Another project", 500, FIRST_REPO_ID)
                .then((projectId) => {
                    cy.waitEvents();
                        cy.updateProjectGithubRepoId(projectId, UNEXISTING_REPO_ID)
                            .asAdmin().errors().its(0).its("extensions.reason").should("equal", "Github repository 2147466666 does not exist");
                })
        );
    });

    it("can invite a user to lead a project", () => {
        const STARKONQUEST_ID = 481932781;

        cy
            .createProject("Another project", 500, STARKONQUEST_ID)
            .asAdmin()
            .data("createProject")
            .then((projectId) => {
                cy.waitEvents();
                cy.createGithubUser(98765).then((user) => {
                    cy.inviteProjectLeader(projectId, user.githubUserId)
                    .asAdmin()
                    .data("inviteProjectLeader")
                    .should("be.a", "string")
                    .then((invitationId) => {
                        cy.acceptProjectLeaderInvitation(invitationId)
                        .asRegisteredUser(user)
                        .data("acceptProjectLeaderInvitation")
                        .should("be.true")
                        .then(() => {
                            cy.waitEvents();
                            cy
                            .graphql({ query: `{
                                projectsByPk(id: "${projectId}") {
                                    projectLeads {
                                        userId
                                    }
                                }
                            }`})
                            .asAnonymous()
                            .data("projectsByPk")
                            .its("projectLeads")
                            .should("deep.include", {userId: user.id});
                        })
                    })
                })
            });

    });


    it("can remove a leader from a project", () => {
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345454).then((user) =>
            cy
                .createProjectWithLeader(user, "Another project", 500, STARKONQUEST_ID)
                .then((projectId) => {
                    cy.waitEvents();
                    cy
                        .unassignProjectLead(projectId, user.id)
                        .asAdmin()
                        .data("unassignProjectLead")
                        .should("equal", true)
                        .then(() => {
                            cy.waitEvents();
                            cy
                                .graphql({ query: `{
                                    projectsByPk(id: "${projectId}") {
                                        projectLeads {
                                            userId
                                        }
                                    }
                                }`})
                                .asAnonymous()
                                .data("projectsByPk")
                                .its("projectLeads")
                                .should("be.empty")
                        })
                })
        );
    });
});
