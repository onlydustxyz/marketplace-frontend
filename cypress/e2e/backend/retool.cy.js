describe("As an admin, on retool, I", () => {
  beforeEach(() => {
    cy.fixture("repos.json").as("repos");
  });

  it("can create a project", function () {
    const projectName = "Cypress test project";
    const REPO = this.repos.A;

    cy.createGithubUser(12345).then(user => {
      cy.createProject(projectName)
        .withLeader(user)
        .withBudget(500)
        .withRepo(REPO.id)
        .then(projectId => {
          cy.graphql({
            query: `query ($projectId: uuid!){
                    projectsByPk(id: $projectId) {
                      githubRepos {
                        githubRepoDetails {
                          id
                          owner
                          name
                          languages
                        }
                      }
                      projectDetails {
                        name
                        shortDescription
                        longDescription
                      }
                    }
                  }`,
            variables: { projectId },
          })
            .asAnonymous()
            .data("projectsByPk")
            .should("deep.equal", {
              githubRepos: [
                {
                  githubRepoDetails: {
                    id: REPO.id,
                    owner: REPO.owner,
                    name: REPO.name,
                    languages: REPO.languages,
                  },
                },
              ],
              projectDetails: {
                name: projectName,
                shortDescription: "My project description",
                longDescription: "This project certainly aim to do stuff",
              },
            });

          cy.graphql({
            query: `{
                projectsByPk(id: "${projectId}") {
                    projectLeads {
                    userId
                    }
                }
            }`,
          })
            .asAnonymous()
            .data("projectsByPk.projectLeads")
            .its(0)
            .its("userId")
            .should("equal", user.id);

          cy.graphql({
            query: `{
                projectsByPk(id: "${projectId}") {
                    projectDetails {
                        logoUrl
                    }
                }
            }`,
          })
            .asAnonymous()
            .data("projectsByPk.projectDetails.logoUrl")
            .should("be.a", "string");

          cy.graphql({
            query: `{
                projects(where: {id: {_eq: "${projectId}"}}) {
                    projectDetails {
                        name
                    }
                }
            }`,
          })
            .asAnonymous()
            .its("body")
            .should("deep.equal", {
              data: {
                projects: [{ projectDetails: { name: projectName } }],
              },
            });
        });
    });
  });

  it("cannot create a project with an empty name", function () {
    cy.callCreateProjectMutation("").asAdmin().errors();
  });

  it("can partially update project details", function () {
    cy.createGithubUser(12345).then(user =>
      cy.createProject("some name").then(projectId => {
        cy.updateProject(projectId, "new name", "https://t.me/bar")
          .asAdmin()
          .data()
          .then(() =>
            cy
              .graphql({
                query: `{
                        projectsByPk(id: "${projectId}") {
                            projectDetails {
                                name
                                telegramLink
                                shortDescription
                            }
                        }
                    }`,
              })
              .asAnonymous()
              .data("projectsByPk.projectDetails")
              .should("deep.equal", {
                name: "new name",
                telegramLink: "https://t.me/bar",
                shortDescription: "My project description",
              })
          );
      })
    );
  });

  it("can create and partially update sponsor", function () {
    const sponsorName1 = Math.random() + " sponsor 1"; // 😱😱😱😱😱😱 mandatory because we check unicity of sponsor names and DB is not reset between tests!
    const sponsorName2 = Math.random() + " sponsor 2"; // 😱😱😱😱😱😱 mandatory because we check unicity of sponsor names and DB is not reset between tests!

    cy.createSponsor(
      sponsorName1,
      "https://www.visit.alsace/wp-content/uploads/2019/05/thio-pate-en-croute-karine-faby-1600x900.jpg",
      "https://croute.fr"
    ).then(sponsorId => {
      cy.updateSponsor(sponsorId, sponsorName2).then(() => {
        cy.graphql({
          query: `{
                sponsorsByPk(id: "${sponsorId}") {
                    name
                    url
                }
            }`,
        })
          .asAnonymous()
          .data("sponsorsByPk")
          .should("deep.equal", {
            name: sponsorName2,
            url: "https://croute.fr/",
          });
      });
    });
  });

  it("can link and unlink a github repository with a project", function () {
    const REPOS = this.repos;

    cy.createGithubUser(12344556).then(user =>
      cy
        .createProject("Another project")
        .withBudget(500)
        .withRepo(REPOS.A.id)
        .then(projectId => {
          cy.linkGithubRepoWithProject(projectId, REPOS.B.id)
            .asAdmin()
            .data()
            .then(() => {
              cy.graphql({
                query: `{
                    projectsByPk(id: "${projectId}") {
                        githubRepos(orderBy: {githubRepoId: ASC}) {
                            githubRepoId
                            githubRepoDetails {
                                name
                            }
                        }
                    }
                }`,
              })
                .asAnonymous()
                .data("projectsByPk")
                .its("githubRepos")
                .should("deep.equal", [
                  {
                    githubRepoId: REPOS.A.id,
                    githubRepoDetails: {
                      name: REPOS.A.name,
                    },
                  },
                  {
                    githubRepoId: REPOS.B.id,
                    githubRepoDetails: {
                      name: REPOS.B.name,
                    },
                  },
                ])
                .then(() => {
                  cy.unlinkGithubRepoFromProject(projectId, REPOS.A.id)
                    .asAdmin()
                    .data()
                    .then(() => {
                      cy.graphql({
                        query: `{
                            projectsByPk(id: "${projectId}") {
                                githubRepos(orderBy: {githubRepoId: ASC}) {
                                    githubRepoId
                                    githubRepoDetails {
                                        name
                                    }
                                }
                            }
                        }`,
                      })
                        .asAnonymous()
                        .data("projectsByPk")
                        .its("githubRepos")
                        .should("deep.equal", [
                          {
                            githubRepoId: REPOS.B.id,
                            githubRepoDetails: {
                              name: REPOS.B.name,
                            },
                          },
                        ]);
                    });
                });
            });
        })
    );
  });

  it("can't link a repository that doesn't exist with a project", function () {
    const REPOS = this.repos;

    cy.createGithubUser(1213243).then(user =>
      cy
        .createProject("Another project")
        .withRepo(REPOS.A.id)
        .then(projectId => {
          cy.linkGithubRepoWithProject(projectId, REPOS.unexisting.id)
            .asAdmin()
            .errors()
            .its(0)
            .its("extensions.reason")
            .should("equal", "Github repository 2147466666 does not exist");
        })
    );
  });

  it("can invite a user to lead a project", function () {
    cy.createProject("Another project").then(projectId => {
      cy.createGithubUser(98765).then(user => {
        cy.inviteProjectLeader(projectId, user.githubUserId)
          .asAdmin()
          .data("inviteProjectLeader")
          .should("be.a", "string")
          .then(invitationId => {
            cy.acceptProjectLeaderInvitation(invitationId)
              .asRegisteredUser(user)
              .data("acceptProjectLeaderInvitation")
              .should("be.true")
              .then(() => {
                cy.graphql({
                  query: `{
                            projectsByPk(id: "${projectId}") {
                                projectLeads {
                                    userId
                                }
                            }
                        }`,
                })
                  .asAnonymous()
                  .data("projectsByPk")
                  .its("projectLeads")
                  .should("deep.include", { userId: user.id });
              });
          });
      });
    });
  });

  it("can remove a leader from a project", function () {
    cy.createGithubUser(12345454).then(user =>
      cy
        .createProject("Without leader")
        .withLeader(user)
        .then(projectId => {
          cy.unassignProjectLead(projectId, user.id)
            .asAdmin()
            .data("unassignProjectLead")
            .should("equal", true)
            .then(() => {
              cy.graphql({
                query: `{
                    projectsByPk(id: "${projectId}") {
                        projectLeads {
                            userId
                        }
                    }
                }`,
              })
                .asAnonymous()
                .data("projectsByPk")
                .its("projectLeads")
                .should("be.empty");
            });
        })
    );
  });

  it("can cancel a payment request", function () {
    const REPO = this.repos.A;

    cy.createGithubUser(12345454).then(leader =>
      cy
        .createProject("Another project")
        .withLeader(leader)
        .withBudget(500)
        .withRepo(REPO.id)
        .then(projectId => {
          cy.requestPayment(projectId, 500, 55000, {
            workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"],
          })
            .asRegisteredUser(leader)
            .data("requestPayment")
            .then(paymentId => {
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

  it("can cut a project budget", function () {
    const REPO = this.repos.A;

    cy.createGithubUser(12345454).then(leader =>
      cy
        .createProject("Another project")
        .withLeader(leader)
        .withBudget(500)
        .withRepo(REPO.id)
        .then(projectId => {
          cy.requestPayment(projectId, 200, 55000, {
            workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"],
          })
            .asRegisteredUser(leader)
            .data("requestPayment")
            .then(() => {
              cy.updateBudgetAllocation(projectId, 0)
                .asAdmin()
                .data("updateBudgetAllocation")
                .should("be.a", "string")
                .then(() => {
                  cy.graphql({
                    query: `
                          query($projectId: uuid!) {
                              projectsByPk(id:$projectId) {
                                  budgets {
                                      remainingAmount
                                  }
                              }
                          }`,
                    variables: { projectId },
                  })
                    .asAdmin()
                    .data("projectsByPk.budgets")
                    .its(0)
                    .its("remainingAmount")
                    .should("equal", 0);
                });
            });
        })
    );
  });

  it("can register an ethereum payment by eth address", function () {
    cy.createGithubUser(12345454).then(leader =>
      cy
        .createProject("Another project")
        .withLeader(leader)
        .withBudget(500)
        .withRepo()
        .then(projectId => {
          cy.requestPayment(projectId, 500, 55000, {
            workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"],
          })
            .asRegisteredUser(leader)
            .data("requestPayment")
            .then(paymentId => {
              cy.paymentRequestShouldExist(paymentId);
              cy.addEthPaymentReceipt(
                projectId,
                paymentId,
                "500",
                "ETH",
                { type: "ETHEREUM_ADDRESS", optEthAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                "0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca"
              )
                .asAdmin()
                .data("addEthPaymentReceipt")
                .then(receipt_id => {
                  cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                });
            });
        })
    );
  });

  it("can register an ethereum payment by eth name", function () {
    cy.createGithubUser(12345454).then(leader =>
      cy
        .createProject("Another project")
        .withLeader(leader)
        .withBudget(500)
        .withRepo()
        .then(projectId => {
          cy.requestPayment(projectId, 500, 55000, {
            workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"],
          })
            .asRegisteredUser(leader)
            .data("requestPayment")
            .then(paymentId => {
              cy.paymentRequestShouldExist(paymentId);
              cy.addEthPaymentReceipt(
                projectId,
                paymentId,
                "500",
                "ETH",
                { type: "ETHEREUM_NAME", optEthName: "vitalik.eth" },
                "0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca"
              )
                .asAdmin()
                .data("addEthPaymentReceipt")
                .then(receipt_id => {
                  cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                });
            });
        })
    );
  });

  it("can register a fiat payment", function () {
    cy.createGithubUser(12345454).then(leader =>
      cy
        .createProject("Another project")
        .withLeader(leader)
        .withBudget(500)
        .withRepo()
        .then(projectId => {
          cy.requestPayment(projectId, 500, 55000, {
            workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"],
          })
            .asRegisteredUser(leader)
            .data("requestPayment")
            .then(paymentId => {
              cy.paymentRequestShouldExist(paymentId);
              cy.addFiatPaymentReceipt(
                projectId,
                paymentId,
                "500",
                "EUR",
                "DE44500105175407324931",
                "my totaly custom payment reference"
              )
                .asAdmin()
                .data("addFiatPaymentReceipt")
                .then(receipt_id => {
                  cy.paymentRequestShouldBePaid(paymentId, receipt_id);
                });
            });
        })
    );
  });
});
