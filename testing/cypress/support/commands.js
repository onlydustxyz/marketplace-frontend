// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('graphql', (query) => {
    return cy.request({
        method: "POST",
        url: "/v1/graphql",
        body: { query: query },
    });
});

Cypress.Commands.add('graphqlAsAdmin', (query) => {
    return cy.request({
        method: "POST",
        url: "/v1/graphql",
        body: { query: query },
        headers: {
            "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
        },
    });
});

Cypress.Commands.add('graphqlAs', (user, query) => {
    return cy.signinUser(user).then(({ accessToken }) =>
        cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: { query: query },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }));
});

Cypress.Commands.add('createProject', (projectName = 'My Project', initialBudget = 500) => {
    return cy.graphqlAsAdmin(`mutation{ createProject(name: "${projectName}", initialBudgetInUsd: ${initialBudget})}`)
        .its("body.data.createProject")
        .should("be.a", "string");
});

Cypress.Commands.add('createUser', () => {
    const email = `cypress-${Date.now()}@onlydust.xyz`;
    const password = "Str0ngPassw#ord-94|%";

    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/signup/email-password',
        body: {
            "email": email,
            "options": {
                "allowedRoles": [
                    "me",
                    "public",
                    "user"
                ],
                "defaultRole": "public",
                "displayName": "John Smith",
                "locale": "en",
            },
            "password": password
        },
        failOnStatusCode: false
    }).then(() => {
        return cy.graphqlAsAdmin(`{
                users(where: {email: {_eq: "${email}"}}) {
                    id
                }
            }`
        )
            .its('body.data.users')
            .its(0)
            .its('id')
            .should('be.a', 'string').then(userId => {
                cy.graphqlAsAdmin(`mutation {
                    updateUser(pk_columns: {id: "${userId}"}, _set: {emailVerified: true}) {
                      id
                    }
                  }`
                )
                    .its('body.data.updateUser.id')
                    .should('be.a', 'string')
                    .then(() => {
                        return {
                            'id': userId,
                            email,
                            password
                        }
                    });
            })
    })
});

Cypress.Commands.add('signinUser', (user) => {
    cy.request('POST', 'http://localhost:4000/signin/email-password', {
        "email": user.email,
        "password": user.password
    })
        .its('body.session.accessToken').should('be.a', 'string').then(accessToken => {
            return {
                'accessToken': accessToken,
                ...user
            }
        });
});

Cypress.Commands.add('addProjectLead', (projectId, userId) => {
    cy.graphqlAsAdmin(`mutation { assignProjectLead(leaderId: "${userId}", projectId: "${projectId}") }`);
});

Cypress.Commands.add('requestPayment', (requestor, projectId, amount, recipient, reason) => {
    return cy.graphqlAs(requestor, `mutation {
        requestPayment(amountInUsd: ${amount}, projectId: "${projectId}", recipientId: "${recipient.id}", requestorId: "${requestor.id}", reason: "{}")
      }
      `).its('body.data.requestPayment').should('be.a', 'string');
});
