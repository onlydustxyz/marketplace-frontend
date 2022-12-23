describe("The application", () => {
    it("should answer on Hasura queries", () => {
        cy.graphql({query: "{ projects { name } }"})
            .asAnonymous()
            .data("projects")
            .should("be.a", "array");
    });

    it("should answer on Rust queries", () => {
        cy.graphql({query: "{ hello }"})
            .asAnonymous()
            .data("hello")
            .should("eq", "Couscous!");
    });

    it("should answer on Github proxy queries", () => {
        cy.graphql({query: "{ helloFromGithubProxy }"})
            .asAnonymous()
            .data("helloFromGithubProxy")
            .should("eq", "Raclette!");
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
