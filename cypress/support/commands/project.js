import "./common";

Cypress.Commands.add(
    "createProject",
    (
        userId,
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 481932781,
        description = "My project description",
        telegramLink = "https://t.me/foo",
        logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4"
    ) => {
        return {
            query: `mutation($projectName: String!, $initialBudget: Int!, $githubRepoId: Int!, $description: String!, $telegramLink: String!, $userId: Uuid!, $logoUrl: String!) {
                createProject(
                    name: $projectName,
                    initialBudgetInUsd: $initialBudget,
                    githubRepoId: $githubRepoId,
                    description: $description,
                    telegramLink: $telegramLink,
                    userId: $userId,
                    logoUrl: $logoUrl
                )}`,
        variables: { projectName, initialBudget, githubRepoId, description, telegramLink, userId, logoUrl }};
    }
);

Cypress.Commands.add(
    "updateProject",
    (
        projectId,
        description = "My project description",
        telegramLink = "https://t.me/foo",
        logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4"
        ) => ({
            query: `mutation($projectId: Uuid!, $description: String!, $telegramLink: String!, $logoUrl: String!) { updateProject(
                id: $projectId,
                description: $description,
                telegramLink: $telegramLink,
                logoUrl: $logoUrl
            )}`,
        variables: { projectId, description, telegramLink, logoUrl }
    })
);

Cypress.Commands.add("getProjectBudget", (projectId) => {
    return {
        query: `query($projectId: uuid!) {
        projectsByPk(id: $projectId) {
            budgets {
                id
            }
        }
    }`, variables: { projectId }};
});

Cypress.Commands.add(
    "updateProjectGithubRepoId",
    (
        id,
        githubRepoId
    ) => {
        return {
            query: `mutation($id: Uuid!, $githubRepoId: Int!) {
                updateProjectGithubRepoId(id: $id, githubRepoId: $githubRepoId)
            }`,
            variables: { id, githubRepoId }
        };
    }
);

Cypress.Commands.add(
    "unassignProjectLead",
    (
        projectId,
        userId
    ) => {
        return {
            query: `mutation($projectId: Uuid!, $userId: Uuid!) {
                unassignProjectLead(projectId: $projectId, userId: $userId)
            }`,
            variables: { projectId, userId}
        };
    }
);
