import { newRandomGithubUserId } from "../../support/utils";

describe("As a simple user, I", () => {
    let projectId;
    let budgetId;
    let leader;

    const STARKONQUEST_ID = 481932781;

    before(() => {
        cy.createUser().withGithubProvider(543221).then(($user) =>
            cy
                .createProject(
                    $user.id,
                    "Project with budget",
                    1000,
                    STARKONQUEST_ID
                )
                .asAdmin()
                .data("createProject")
                .then(($projectId) => {
                    cy.getProjectBudget($projectId)
                        .asRegisteredUser($user)
                        .data("projectsByPk.budgets")
                        .its(0)
                        .its("id")
                        .should("be.a", "string")
                        .then(($budgetId) => {
                            projectId = $projectId;
                            budgetId = $budgetId;
                            leader = $user;
                        });
                })
        );
    });

    it("can get projects with some details", () => {
        cy.createUser().then((user) => {
            cy.graphql({
                query: `query {
                projects {
                  name
                  githubRepoId
                  id
                  projectDetails {
                    description
                  }
                  projectLeads {
                    user {
                      avatarUrl
                      displayName
                    }
                  }
                }
              }`})
                .asRegisteredUser(user)
                .data("projects")
                .should("be.a", "array");
        });
    });

    it("can get payment request as the recipient", () => {
        const githubUserId = newRandomGithubUserId();

        cy.requestPayment(projectId, 500, githubUserId, {})
            .asRegisteredUser(leader)
            .data()
            .then(() => {
                cy.createUser()
                    .withGithubProvider(githubUserId)
                    .then((user) => {
                        cy.graphql({
                            query: `query {
                                    paymentRequests {
                                        id
                                        recipientId
                                        amountInUsd
                                        budgetId
                                        recipient {
                                            userId
                                        }
                                    }
                                }`})
                            .asRegisteredUser(user)
                            .data("paymentRequests")
                            .should("be.a", "array")
                            .its(0)
                            .then((paymentRequest) => {
                                expect(paymentRequest.recipientId).equal(
                                    user.githubUserId
                                );
                                expect(paymentRequest.amountInUsd).equal(500);
                                expect(paymentRequest.budgetId).equal(budgetId);
                                expect(paymentRequest.recipient.userId).equal(
                                    user.id
                                );
                            });
                    });
            });
    });

    it("can't request a payment", () => {
        cy.createUser().then((user) => {
            cy.requestPayment(budgetId, 500, 55000, {})
                .asRegisteredUser(user)
                .errors()
                .its(0)
                .its("message")
                .should("eq", "User is not authorized to perform this action");
        });
    });

    it("can fetch github repository details from a project", () => {
        cy.createUser().then((user) => {
            cy.graphql({
                query: `{
                projectsByPk(id: "${projectId}") {
                  githubRepo {
                    id
                    name
                    owner
                    content {
                        contributors {
                        id
                        login
                        avatarUrl
                        }
                        readme {
                        encoding
                        content
                        }
                        logoUrl
                    }
                  }
                }
              }`})
                .asRegisteredUser(user)
                .data("projectsByPk.githubRepo")
                .then((repo) => {
                    expect(repo.id).equal(STARKONQUEST_ID);
                    expect(repo.name).equal("starkonquest");
                    expect(repo.owner).equal("onlydustxyz");
                    expect(repo.content.contributors).to.be.an("array");
                    expect(repo.content.contributors[0]).to.have.all.keys([
                        "id",
                        "login",
                        "avatarUrl",
                    ]);
                    expect(repo.content.readme.encoding).equal("BASE64");
                    expect(repo.content.readme.content).to.be.a("string");
                    expect(repo.content.logoUrl).to.be.a("string");
                });
        });
    });

    it("can fetch github user details from name", () => {
        cy.createUser().then((user) => {
            cy.graphql({
                query: `{
                    fetchUserDetails(username: "abuisset") {
                      id
                      login
                      avatarUrl
                    }
                  }`})
                .asRegisteredUser(user)
                .data("fetchUserDetails")
                .then((user) => {
                    expect(user.id).equal(990474);
                    expect(user.login).equal("abuisset");
                    expect(user.avatarUrl).to.be.a("string");
                });
        });
    });


    it("can update my info", () => {
        let email = "pierre.fabre@gmail.com";
        let location =
            { city: "Paris", country: "France", number: "4", postCode: "75008", street: "avenue des Champs Elysee" };
        let identity =
            { type: "PERSON", optPerson: { firstname: "Pierre", lastname: "Fabre" } };
        let payout_settings =
            { type: "ETHEREUM_ADDRESS", optEthAddress: "0x123" };

        let new_payout_settings =
            { type: "ETHEREUM_NAME", optEthName: "vitalik.eth" };

        cy.createUser().withGithubProvider(12345).then((user) => {
            cy.updateProfileInfo(email, location, identity, payout_settings)
                .asRegisteredUser(user)
                .data("updateProfileInfo")
                .should("eq", user.id)
                .then(() => {
                    cy.graphql({
                        query: `{
                    userInfoByPk(userId: "${user.id}") {
                        identity
                        email
                        location
                        payoutSettings
                      }
                  }`})
                        .asAdmin()
                        .data("userInfoByPk")
                        .should("deep.eq", {
                            identity: {
                                Person: {
                                    lastname: "Fabre",
                                    firstname: "Pierre",
                                },
                            },
                            email: email,
                            location: {
                                city: "Paris",
                                number: "4",
                                street: "avenue des Champs Elysee",
                                country: "France",
                                post_code: "75008",
                            },
                            payoutSettings: { EthTransfer: { Address: "0x0123" } },
                        });
                })
                .then(() =>
                    cy
                        .updateProfileInfo(
                            email,
                            location,
                            identity,
                            new_payout_settings
                        )
                        .asRegisteredUser(user)
                        .data()
                )
                .then(() => {
                    cy.graphql({
                        query: `{
                    userInfoByPk(userId: "${user.id}") {
                        identity
                        email
                        location
                        payoutSettings
                      }
                  }`})
                        .asAdmin()
                        .data("userInfoByPk")
                        .should("deep.eq", {
                            identity: {
                                Person: {
                                    lastname: "Fabre",
                                    firstname: "Pierre",
                                },
                            },
                            email: email,
                            location: {
                                city: "Paris",
                                number: "4",
                                street: "avenue des Champs Elysee",
                                country: "France",
                                post_code: "75008",
                            },
                            payoutSettings: { EthTransfer: { Name: "vitalik.eth" } },
                        });
                });
        });
    });
});
