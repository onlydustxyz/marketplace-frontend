describe("The application", () => {
    it("should answer on Hasura queries", () => {
        cy.graphql("{ projects { name } }")
            .its("body.data.projects")
            .should(projects => {
                assert.isArray(projects);
            });
    });

    it("should answer on Rust queries", () => {
        cy.graphql("{ hello }")
            .its("body")
            .should("deep.equal", {
                data: {
                    hello: "Couscous!",
                },
            });
    });


    it("should answer on Github proxy queries", () => {
        cy.graphql("{ helloFromGithubProxy }")
            .its("body")
            .should("deep.equal", {
                data: {
                    helloFromGithubProxy: "Raclette!",
                },
            });
    });

    it("should answer on health checks for API", () => {
        cy.request("GET", "http://localhost:8000/health")
            .its("body")
            .should("deep.equal", {
                status: "ok",
            });
    });


    it("should answer on health checks for github proxy", () => {
        cy.request("GET", "http://localhost:8001/health")
            .its("body")
            .should("deep.equal", {
                status: "ok",
            });
    });
});
