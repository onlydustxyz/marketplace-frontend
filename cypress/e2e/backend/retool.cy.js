describe("As an admin, on retool, I", () => {
    it("can create a project", () => {
        const projectName = "Cypress test project";
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345).then((user) => {
            cy.createProjectWithLeader(user, projectName, 500, STARKONQUEST_ID)
                .then((projectId) => {
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
                            projectDetails {
                                name
                            }
                        }
                    }`})
                        .asAnonymous()
                        .its("body")
                        .should("deep.equal", {
                            data: {
                                projects: [{ projectDetails: { name: projectName }}],
                            },
                        });
                });
        });
    });

    it("cannot create a project with an empty name", () => {
        cy.createProject("").asAdmin().errors();
    });

    it("can update project details", () => {
        cy.createGithubUser(12345).then((user) =>
            cy
                .createProjectWithLeader(user, "Another project", 500)
                .then((projectId) => {
                    cy.updateProject(projectId, "new name", "new description")
                        .asAdmin()
                        .data()
                        .then(() =>
                            cy.graphql({ query: `{
                                    projectsByPk(id: "${projectId}") {
                                        projectDetails {
                                            name
                                            description
                                        }
                                    }
                                }`})
                                .asAnonymous()
                                .data("projectsByPk.projectDetails")
                                .should("deep.equal", {
                                    name: "new name",
                                    description: "new description",
                                })
                        )
                })
        );
    });

    it("can update a project github repository id", () => {
        const FIRST_REPO_ID = 1;
        const SECOND_REPO_ID = 1234;

        cy.createGithubUser(12344556).then((user) =>
            cy.createProjectWithLeader(user, "Another project", 500, FIRST_REPO_ID)
                .then((projectId) => {
                    cy.updateProjectGithubRepoId(projectId, SECOND_REPO_ID)
                        .asAdmin()
                        .data()
                        .then(() => {
                            cy.graphql({ query: `{
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
            cy.createProjectWithLeader(user, "Another project", 500, FIRST_REPO_ID)
                .then((projectId) => {
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
                            cy.graphql({ query: `{
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
                    cy.unassignProjectLead(projectId, user.id)
                        .asAdmin()
                        .data("unassignProjectLead")
                        .should("equal", true)
                        .then(() => {
                            cy.graphql({ query: `{
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

    it("can cancel a payment request", () => {
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345454).then((leader) =>
            cy
                .createProjectWithLeader(leader, "Another project", 500, STARKONQUEST_ID)
                .then((projectId) => {
                    cy.requestPayment(projectId, 500, 55000, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
                        .asRegisteredUser(leader)
                        .data("requestPayment")
                        .then((paymentId) => {
                            cy.paymentRequestShouldExist(paymentId);
                            cy.cancelPaymentRequest(projectId, paymentId)
                                .asAdmin()
                                .data("cancelPaymentRequest")
                                .should("equal", paymentId)
                                .then(() => {
                                    cy.paymentRequestShouldNotExist(paymentId);
                                });
                        });
                })
        );
    });

    it("can register an ethereum payment by eth address", () => {
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345454).then((leader) =>
            cy
                .createProjectWithLeader(leader, "Another project", 500, STARKONQUEST_ID)
                .then((projectId) => {
                    cy.requestPayment(projectId, 500, 55000, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
                        .asRegisteredUser(leader)
                        .data("requestPayment")
                        .then((paymentId) => {
                            cy.paymentRequestShouldExist(paymentId);
                            cy.addEthPaymentReceipt(projectId, paymentId, "500", "ETH", {type: "ETHEREUM_ADDRESS", optEthAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"}, "0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca")
                                .asAdmin().data("addEthPaymentReceipt").then((receipt_id) => {
                                    cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                                });
                        });
                })
        );
    });

    it("can register an ethereum payment by eth name", () => {
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345454).then((leader) =>
            cy
                .createProjectWithLeader(leader, "Another project", 500, STARKONQUEST_ID)
                .then((projectId) => {
                    cy.requestPayment(projectId, 500, 55000, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
                        .asRegisteredUser(leader)
                        .data("requestPayment")
                        .then((paymentId) => {
                            cy.paymentRequestShouldExist(paymentId);
                            cy.addEthPaymentReceipt(projectId, paymentId, "500", "ETH", {type: "ETHEREUM_NAME", optEthName: "vitalik.eth"}, "0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca")
                                .asAdmin().data("addEthPaymentReceipt").then((receipt_id) => {
                                    cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                                });
                        });
                })
        );
    });

    it("can register a fiat payment", () => {
        const STARKONQUEST_ID = 481932781;

        cy.createGithubUser(12345454).then((leader) =>
            cy
                .createProjectWithLeader(leader, "Another project", 500, STARKONQUEST_ID)
                .then((projectId) => {
                    cy.requestPayment(projectId, 500, 55000, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
                        .asRegisteredUser(leader)
                        .data("requestPayment")
                        .then((paymentId) => {
                            cy.paymentRequestShouldExist(paymentId);
                            cy.addFiatPaymentReceipt(projectId, paymentId, "500", "EUR", "DE44500105175407324931", "my totaly custom payment reference")
                                .asAdmin().data("addFiatPaymentReceipt").then((receipt_id) => {
                                    cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                                });
                        });
                })
        );
    });
});
