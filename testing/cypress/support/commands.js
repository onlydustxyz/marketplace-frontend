// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('graphqlAsAdmin', (body) => {
    return cy.request({
        method: "POST",
        url: "/v1/graphql",
        body: body,
        headers: {
            "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
        },
    });
});

Cypress.Commands.add('createProject', (projectName) => {
    return cy.graphqlAsAdmin({
        query: `mutation{ createProject(name: "${projectName}")}`,
    })
        .its("body.data.createProject")
        .should("be.a", "string");
});
