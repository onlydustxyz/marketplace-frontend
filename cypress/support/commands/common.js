const GRAPHQL_TIMEOUT = 10000;
const READ_BODY_PROPERTY_TIMEOUT = 100;

Cypress.Commands.add("graphql", (query) => {
    return query;
});

Cypress.Commands.add(
    "asAnonymous",
    {
        prevSubject: true,
    },
    (query) => {
        expect(JSON.stringify(query)).to.be.a("string");
        return cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: query,
            timeout: GRAPHQL_TIMEOUT,
        });
    }
);

Cypress.Commands.add(
    "asAdmin",
    {
        prevSubject: true,
    },
    (query) => {
        expect(JSON.stringify(query)).to.be.a("string");
        return cy.request({
            method: "POST",
            url: "/v1/graphql",
            body: query,
            headers: {
                "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
            },
            timeout: GRAPHQL_TIMEOUT,
        });
    }
);

Cypress.Commands.add(
    "asRegisteredUser",
    {
        prevSubject: "optional",
    },
    (query, user) => {
        return cy.signinUser(user).then(({ session }) => {
            expect(JSON.stringify(query)).to.be.a("string");
            cy.request({
                method: "POST",
                url: "/v1/graphql",
                body: query,
                headers: {
                    "X-Hasura-Role": "registered_user",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                timeout: GRAPHQL_TIMEOUT,
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
        cy.wrap(object, { timeout: READ_BODY_PROPERTY_TIMEOUT })
            .should(($object) => {
                expect(
                    $object,
                    JSON.stringify($object)
                ).to.have.deep.nested.property(property).that.is.not.null;
            })
            .its(property, { timeout: READ_BODY_PROPERTY_TIMEOUT });
    }
);

Cypress.Commands.add(
    "data",
    {
        prevSubject: true,
    },
    (response, path = null) => {
        cy.wrap(response, { timeout: READ_BODY_PROPERTY_TIMEOUT })
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
        cy.wrap(response, { timeout: READ_BODY_PROPERTY_TIMEOUT }).should("have.property", "body").property("errors");
    }
);
