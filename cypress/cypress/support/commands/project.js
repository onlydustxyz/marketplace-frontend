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
        return `mutation{ createProject(
            name: "${projectName}",
            initialBudgetInUsd: ${initialBudget},
            githubRepoId: ${githubRepoId},
            description: "${description}",
            telegramLink: "${telegramLink}",
            userId: "${userId}"
        )}`;
    }
);

Cypress.Commands.add(
    "updateProject",
    (
        projectId,
        description = "My project description",
        telegramLink = "https://t.me/foo"
    ) => {
        return `mutation{ updateProject(
                id: "${projectId}",
                description: "${description}",
                telegramLink: "${telegramLink}",
            )}`;
    }
);

Cypress.Commands.add("getProjectBudget", (projectId) => {
    return `{
        projectsByPk(id: "${projectId}") {
            budgets {
                id
            }
        }
    }`;
});
