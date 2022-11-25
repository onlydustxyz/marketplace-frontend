describe("Retool", () => {
    it("can create projects", () => {
        const projectName = "Cypress test project";

        cy.createProject(projectName)
            .then($project_id => {
                // Let the event sourcing magic happen
                cy.wait(500);

                cy.request("POST", "/v1/graphql", {
                    query: `{ projects(where: {id: {_eq: "${$project_id}"}}) { name } }`,
                })
                    .its("body")
                    .should("deep.equal", {
                        data: {
                            projects: [{ name: projectName }],
                        },
                    });
            });
    });
});
