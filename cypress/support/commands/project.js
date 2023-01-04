import "./common";

Cypress.Commands.add(
    "createProject",
    (
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 481932781,
        description = "My project description",
        telegramLink = "https://t.me/foo",
        logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4"
    ) => {
        return {
            query: `mutation($projectName: String!, $initialBudget: Int!, $githubRepoId: Int!, $description: String!, $telegramLink: String!, $logoUrl: String!) {
                createProject(
                    name: $projectName,
                    initialBudgetInUsd: $initialBudget,
                    githubRepoId: $githubRepoId,
                    description: $description,
                    telegramLink: $telegramLink,
                    logoUrl: $logoUrl
                )}`,
        variables: { projectName, initialBudget, githubRepoId, description, telegramLink, logoUrl }};
    }
);

Cypress.Commands.add(
    "createProjectWithLeader",
    (
        user,
        projectName = "My Project",
        initialBudget = 500,
        githubRepoId = 481932781,
        description = "My project description",
        telegramLink = "https://t.me/foo",
        logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4"
    ) => {
        cy.createProject(projectName, initialBudget, githubRepoId, description, telegramLink, logoUrl)
            .asAdmin()
            .data("createProject")
            .then(projectId => {
                cy.inviteProjectLeader(projectId, user.githubUserId)
                .asAdmin()
                .data("inviteProjectLeader")
                .should("be.a", "string")
                .then(invitationId => cy.acceptProjectLeaderInvitation(invitationId)).asRegisteredUser(user).then(() => projectId)
            })
});


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

Cypress.Commands.add(
    "inviteProjectLeader",
    (
        projectId,
        githubUserId
    ) => {
        return {
            query: `mutation($projectId: Uuid!, $githubUserId: Int!) {
                inviteProjectLeader(projectId: $projectId, githubUserId: $githubUserId)
            }`,
            variables: { projectId, githubUserId}
        };
    }
);

Cypress.Commands.add(
    "acceptProjectLeaderInvitation",
    (
        invitationId,
    ) => {
        return {
            query: `mutation($invitationId: Uuid!) {
                acceptProjectLeaderInvitation(invitationId: $invitationId)
            }`,
            variables: { invitationId }
        };
    }
);
