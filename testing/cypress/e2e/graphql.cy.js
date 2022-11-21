describe("GraphQL", () => {
    it("should answer", () => {
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
});
