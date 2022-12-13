import "./common";

Cypress.Commands.add(
    "createProject",
    (
        userId,
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 1234,
        description = "My project description",
        telegramLink = "https://t.me/foo"
    ) => {
        return cy
            .graphqlAsAdmin(
                `mutation{ createProject(
            name: "${projectName}",
            initialBudgetInUsd: ${initialBudget},
            githubRepoId: ${githubRepoId},
            description: "${description}",
            telegramLink: "${telegramLink}",
            userId: "${userId}"
        )}`
            )
            .data("createProject")
            .should("be.a", "string");
    }
);

Cypress.Commands.add(
    "updateProject",
    (
        projectId,
        description = "My project description",
        telegramLink = "https://t.me/foo"
    ) => {
        return cy
            .graphqlAsAdmin(
                `mutation{ updateProject(
            id: "${projectId}",
            description: "${description}",
            telegramLink: "${telegramLink}",
        )}`
            )
            .data("updateProject")
            .should("equal", projectId);
    }
);

Cypress.Commands.add("getProjectBudget", (user, projectId) => {
    return cy.graphqlAsUser(
        user,
        `{
        projectsByPk(id: "${projectId}") {
            budgets {
                id
            }
        }
    }`
    );
});
