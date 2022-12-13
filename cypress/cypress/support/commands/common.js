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
