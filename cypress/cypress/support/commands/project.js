import "./common";

Cypress.Commands.add(
    "createProject",
    (
        userId,
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 481932781,
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

Cypress.Commands.add(
    "updateProjectGithubRepoId",
    (
        id,
        githubRepoId
    ) => {
        return `mutation{ updateProjectGithubRepoId(
                id: "${id}",
                githubRepoId: ${githubRepoId},
            )}`;
    }
);
