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
    "asAnonymous",
    {
        prevSubject: true,
    },
    (query) => {
        expect(query).to.be.a("string");
        return cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: { query: query },
        });
    }
);

Cypress.Commands.add(
    "asAdmin",
    {
        prevSubject: true,
    },
    (query) => {
        expect(query).to.be.a("string");
        return cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: { query: query },
            headers: {
                "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
            },
        });
    }
);

Cypress.Commands.add(
    "asRegisteredUser",
    {
        prevSubject: "optional",
    },
    (query, user) => {
        return cy.signinUser(user).then(({ accessToken }) => {
            expect(query).to.be.a("string");
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
    }
);

Cypress.Commands.add(
    "property",
    {
        prevSubject: true,
    },
    (object, property) => {
        cy.wrap(object)
            .should(($object) => {
                expect(
                    $object,
                    JSON.stringify($object)
                ).to.have.deep.nested.property(property);
            })
            .its(property);
    }
);

Cypress.Commands.add(
    "data",
    {
        prevSubject: true,
    },
    (response, path = null) => {
        cy.wrap(response)
            .should("have.property", "body")
            .property("data")
            .then((data) => {
                if (path !== null) {
                    return cy.wrap(data).property(path);
                }
                return data;
            });
    }
);

Cypress.Commands.add(
    "errors",
    {
        prevSubject: true,
    },
    (response) => {
        cy.wrap(response).should("have.property", "body").property("errors");
    }
);
