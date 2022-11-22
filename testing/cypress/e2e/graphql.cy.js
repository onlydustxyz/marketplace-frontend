describe("GraphQL", () => {
    it("should answer on Hasura queries", () => {
        cy.request("POST", "/v1/graphql", {
            query: "{ projects { name } }",
        })
            .its("body")
            .should("deep.equal", {
                data: {
                    projects: [],
                },
            });
    });
    it("should answer on Rust queries", () => {
        cy.request("POST", "/v1/graphql", {
            query: "{ hello }",
        })
            .its("body")
            .should("deep.equal", {
                data: {
                    hello: "Couscous!",
                },
            });
    });
});
