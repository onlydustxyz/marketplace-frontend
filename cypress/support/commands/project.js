import { WAIT_SHORT, WAIT_LONG } from "./common";

Cypress.Commands.add(
  "createProject",
  (
    projectName = "My Project",
    initialBudget = 500,
    telegramLink = "https://t.me/foo",
    logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4",
    shortDescription = "My project description",
    longDescription = "This project certainly aim to do stuff"
  ) => {
    return {
      query: `mutation($projectName: String!, $initialBudget: Int!, $telegramLink: String!, $logoUrl: String!, $shortDescription: String!, $longDescription: String!) {
                createProject(
                    name: $projectName,
                    initialBudgetInUsd: $initialBudget,
                    telegramLink: $telegramLink,
                    logoUrl: $logoUrl,
                    shortDescription: $shortDescription,
                    longDescription: $longDescription,
                )}`,
      variables: {
        projectName,
        initialBudget,
        telegramLink,
        logoUrl,
        shortDescription: shortDescription,
        longDescription: longDescription,
      },
      wait: WAIT_LONG,
    };
  }
);

Cypress.Commands.add(
  "createProjectWithLeader",
  (
    user,
    projectName = "My Project",
    initialBudget = 500,
    githubRepoId = 0,
    telegramLink = "https://t.me/foo",
    logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4",
    shortDescription = "My project description",
    longDescription = "This project certainly aim to do stuff"
  ) => {
    cy.createProject(projectName, initialBudget, telegramLink, logoUrl, shortDescription, longDescription)
      .asAdmin()
      .data("createProject")
      .then(projectId => {
        cy.inviteProjectLeader(projectId, user.githubUserId)
          .asAdmin()
          .data("inviteProjectLeader")
          .should("be.a", "string")
          .then(invitationId => cy.acceptProjectLeaderInvitation(invitationId))
          .asRegisteredUser(user)
          .then(() => projectId);

        cy.fixture("repos.json").then(repos => {
          cy.linkGithubRepoWithProject(projectId, githubRepoId === 0 ? repos.A.id : githubRepoId)
            .asAdmin()
            .data("linkGithubRepo.projectId")
            .should("be.a", "string");
        });
      });
  }
);

Cypress.Commands.add(
  "updateProject",
  (
    projectId,
    name = "My Project",
    telegramLink = "https://t.me/foo",
    logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4",
    shortDescription = "My project description",
    longDescription = "This project certainly aim to do stuff"
  ) => ({
    query: `mutation($projectId: Uuid!, $name: String!, $telegramLink: String!, $logoUrl: String!, $shortDescription: String!, $longDescription: String!) { updateProject(
            id: $projectId,
            name: $name,
            telegramLink: $telegramLink,
            logoUrl: $logoUrl
            shortDescription: $shortDescription,
            longDescription: $longDescription,
        )}`,
    variables: { projectId, name, telegramLink, logoUrl, shortDescription, longDescription },
    wait: WAIT_LONG,
  })
);

Cypress.Commands.add("getProjectBudget", projectId => {
  return {
    query: `query($projectId: uuid!) {
        projectsByPk(id: $projectId) {
            budgets {
                id
            }
        }
    }`,
    variables: { projectId },
  };
});

Cypress.Commands.add("updateBudgetAllocation", (projectId, amount) => {
  return cy
    .graphql({
      query: `mutation ($projectId: Uuid!, $amount: Int!) {
          updateBudgetAllocation(projectId: $projectId, newRemainingAmountInUsd: $amount)
      }`,
      variables: { projectId, amount },
      wait: WAIT_LONG,
    })
    .asAdmin()
    .data("updateBudgetAllocation")
    .should("equal", true);
});

Cypress.Commands.add("linkGithubRepoWithProject", (projectId, githubRepoId) => {
  return {
    query: `mutation($projectId: Uuid!, $githubRepoId: Int!) {
                linkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId) {
                    projectId
                }
            }`,
    variables: { projectId, githubRepoId },
    wait: WAIT_SHORT,
  };
});

Cypress.Commands.add("unlinkGithubRepoFromProject", (projectId, githubRepoId) => {
  return {
    query: `mutation($projectId: Uuid!, $githubRepoId: Int!) {
                unlinkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId) {
                    projectId
                }
            }`,
    variables: { projectId, githubRepoId },
    wait: WAIT_SHORT,
  };
});

Cypress.Commands.add("unassignProjectLead", (projectId, userId) => {
  return {
    query: `mutation($projectId: Uuid!, $userId: Uuid!) {
                unassignProjectLead(projectId: $projectId, userId: $userId)
            }`,
    variables: { projectId, userId },
    wait: WAIT_SHORT,
  };
});

Cypress.Commands.add("inviteProjectLeader", (projectId, githubUserId) => {
  return {
    query: `mutation($projectId: Uuid!, $githubUserId: Int!) {
                inviteProjectLeader(projectId: $projectId, githubUserId: $githubUserId)
            }`,
    variables: { projectId, githubUserId },
    wait: WAIT_SHORT,
  };
});

Cypress.Commands.add("acceptProjectLeaderInvitation", invitationId => {
  return {
    query: `mutation($invitationId: Uuid!) {
                acceptProjectLeaderInvitation(invitationId: $invitationId)
            }`,
    variables: { invitationId },
    wait: WAIT_SHORT,
  };
});
