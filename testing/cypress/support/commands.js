// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("graphql", (query) => {
    return cy.request({
        method: "POST",
        url: "/v1/graphql",
        body: { query: query },
    });
});

Cypress.Commands.add("graphqlAsAdmin", (query) => {
    return cy.request({
        method: "POST",
        url: "/v1/graphql",
        body: { query: query },
        headers: {
            "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
        },
    });
});

Cypress.Commands.add("graphqlAsUser", (user, query) => {
    return cy.signinUser(user).then(({ accessToken }) => {
        cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: { query: query },
            headers: {
                "X-Hasura-Role": "registered_user",
                Authorization: `Bearer ${accessToken}`,
            },
        });
    });
});

Cypress.Commands.add(
    "createProject",
    (
        userId,
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 1234,
        description = "My project description",
        telegramLink = "https://t.me/foo"
    ) => {
        return cy
            .graphqlAsAdmin(
                `mutation{ createProject(
            name: "${projectName}",
            initialBudgetInUsd: ${initialBudget},
            githubRepoId: ${githubRepoId},
            description: "${description}",
            telegramLink: "${telegramLink}",
            userId: "${userId}"
        )}`
            )
            .its("body.data.createProject")
            .should("be.a", "string");
    }
);

Cypress.Commands.add(
    "updateProject",
    (
        projectId,
        description = "My project description",
        telegramLink = "https://t.me/foo"
    ) => {
        return cy
            .graphqlAsAdmin(
                `mutation{ updateProject(
            id: "${projectId}",
            description: "${description}",
            telegramLink: "${telegramLink}",
        )}`
            )
            .its("body.data.updateProject")
            .should("equal", projectId);
    }
);

Cypress.Commands.add("createUser", () => {
    const email = `cypress-${Date.now()}@onlydust.xyz`;
    const password = "Str0ngPassw#ord-94|%";

    cy.request({
        method: "POST",
        url: "http://localhost:4000/signup/email-password",
        body: {
            email: email,
            options: {
                allowedRoles: ["me", "public", "registered_user"],
                defaultRole: "public",
                displayName: "John Smith",
                locale: "en",
            },
            password: password,
        },
        failOnStatusCode: false,
    }).then(() => {
        return cy
            .graphqlAsAdmin(
                `{
                users(where: {email: {_eq: "${email}"}}) {
                    id
                }
            }`
            )
            .its("body.data.users")
            .its(0)
            .its("id")
            .should("be.a", "string")
            .then((userId) => {
                cy.graphqlAsAdmin(
                    `mutation {
                    updateUser(pk_columns: {id: "${userId}"}, _set: {emailVerified: true}) {
                      id
                    }
                  }`
                )
                    .its("body.data.updateUser.id")
                    .should("be.a", "string")
                    .then(() => {
                        return {
                            id: userId,
                            email,
                            password,
                        };
                    });
            });
    });
});

Cypress.Commands.add("signinUser", (user) => {
    cy.request("POST", "http://localhost:4000/signin/email-password", {
        email: user.email,
        password: user.password,
    })
        .its("body.session.accessToken")
        .should("be.a", "string")
        .then((accessToken) => {
            return {
                accessToken: accessToken,
                ...user,
            };
        });
});

Cypress.Commands.add(
    "requestPayment",
    (requestor, budgetId, amount, recipient, reason) => {
        return cy
            .requestPaymentNoassert(
                requestor,
                budgetId,
                amount,
                recipient,
                reason
            )
            .its("body.data.requestPayment")
            .should("be.a", "string");
    }
);

Cypress.Commands.add(
    "requestPaymentNoassert",
    (requestor, budgetId, amount, recipient, reason) => {
        return cy.graphqlAsUser(
            requestor,
            `mutation {
        requestPayment(amountInUsd: ${amount}, budgetId: "${budgetId}", recipientId: "${recipient.id}", reason: "${reason}")
      }
      `
        );
    }
);

Cypress.Commands.add("getProjectBudget", (user, projectId) => {
    return cy.graphqlAsUser(
        user,
        `{
        projectsByPk(id: "${projectId}") {
            budgets {
                id
            }
        }
    }`
    );
});


Cypress.Commands.add('updateProfileInfo', (requestor, email, location, identity, payout_settings) => {
    return cy.graphqlAsUser(requestor, `mutation {
        updateProfileInfo(email: "${email}", identity: ${identity}, location: ${location}, payoutSettings: ${payout_settings})
    }`);
});
