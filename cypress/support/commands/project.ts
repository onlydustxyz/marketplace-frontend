import { WAIT_SHORT, WAIT_LONG, GraphQLRequest, Url, Uuid } from "./common";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      callCreateProjectMutation(props: CreateProjectProps): Chainable<GraphQLRequest>;
      updateProject(projectId: Uuid, props: UpdateProjectProps): Chainable<GraphQLRequest>;
      getProjectBudget(projectId: Uuid): Chainable<GraphQLRequest>;
      updateBudgetAllocation(projectId: Uuid, amount: number): Chainable<GraphQLRequest>;
      linkGithubRepoWithProject(projectId: Uuid, githubRepoId: number): Chainable<GraphQLRequest>;
      unlinkGithubRepoFromProject(projectId: Uuid, githubRepoId: number): Chainable<GraphQLRequest>;
      unassignProjectLead(projectId: Uuid, userId: Uuid): Chainable<GraphQLRequest>;
      inviteProjectLeader(projectId: Uuid, githubUserId: number): Chainable<GraphQLRequest>;
      acceptProjectLeaderInvitation(invitationId: Uuid): Chainable<GraphQLRequest>;

      createProject(
        projectName?: string,
        telegramLink?: Url,
        logoUrl?: Url,
        shortDescription?: string,
        longDescription?: string
      ): Chainable<Uuid>;
      withLeader(user: any): Chainable<Uuid>;
      withRepo(githubRepoId?: number): Chainable<Uuid>;
      withBudget(amount: number): Chainable<Uuid>;
    }
  }
}

export type CreateProjectProps = {
  projectName?: string;
  telegramLink?: Url;
  logoUrl?: Url;
  shortDescription?: string;
  longDescription?: string;
  initialBudget?: number;
};

export type UpdateProjectProps = {
  name?: string;
  telegramLink?: Url;
  logoUrl?: Url;
  shortDescription?: string;
  longDescription?: string;
};

Cypress.Commands.add(
  "callCreateProjectMutation",
  ({
    projectName = "My Project",
    telegramLink = "https://t.me/foo",
    logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4",
    shortDescription = "My project description",
    longDescription = "This project certainly aim to do stuff",
    initialBudget,
  }: CreateProjectProps) => {
    return cy.wrap({
      query: `mutation ($projectName: String!, $telegramLink: Url!, $logoUrl: Url!, $shortDescription: String!, $longDescription: String!, $initialBudget: Int) {
                createProject(
                    name: $projectName,
                    telegramLink: $telegramLink,
                    logoUrl: $logoUrl,
                    shortDescription: $shortDescription,
                    longDescription: $longDescription,
                    initialBudget: $initialBudget,
                )}`,
      variables: {
        projectName,
        telegramLink,
        logoUrl,
        shortDescription,
        longDescription,
        initialBudget,
      },
      wait: WAIT_LONG,
    });
  }
);

Cypress.Commands.add(
  "createProject",
  (
    projectName = "My Project",
    telegramLink = "https://t.me/foo",
    logoUrl = "https://avatars.githubusercontent.com/u/98735558?v=4",
    shortDescription = "My project description",
    longDescription = "This project certainly aim to do stuff"
  ) => {
    cy.callCreateProjectMutation({ projectName, telegramLink, logoUrl, shortDescription, longDescription })
      .asAdmin()
      .data("createProject");
  }
);

Cypress.Commands.add(
  "withLeader",
  {
    prevSubject: true,
  },
  (projectId, user) => {
    cy.inviteProjectLeader(projectId, user.githubUserId || user.github.id)
      .asAdmin()
      .data("inviteProjectLeader")
      .should("be.a", "string")
      .then(invitationId => cy.acceptProjectLeaderInvitation(invitationId))
      .asRegisteredUser(user)
      .then(() => projectId);
  }
);

Cypress.Commands.add(
  "withRepo",
  {
    prevSubject: true,
  },
  (projectId, githubRepoId) => {
    cy.fixture("repos.json").then(repos => {
      cy.linkGithubRepoWithProject(projectId, !githubRepoId ? repos.A.id : githubRepoId)
        .asAdmin()
        .data("linkGithubRepo")
        .should("be.a", "string")
        .then(() => projectId);
    });
  }
);

Cypress.Commands.add(
  "withBudget",
  {
    prevSubject: true,
  },
  (projectId, amount) => {
    cy.updateBudgetAllocation(projectId, amount)
      .asAdmin()
      .data("updateBudgetAllocation")
      .should("be.a", "string")
      .then(() => projectId);
  }
);

Cypress.Commands.add(
  "updateProject",
  (
    projectId,
    {
      name = undefined,
      telegramLink = undefined,
      logoUrl = undefined,
      shortDescription = undefined,
      longDescription = undefined,
    }
  ) =>
    cy.wrap({
      query: `mutation($projectId: Uuid!, $name: String, $telegramLink: Url, $logoUrl: Url, $shortDescription: String, $longDescription: String) { updateProject(
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
  return cy.wrap({
    query: `query($projectId: uuid!) {
        projectsByPk(id: $projectId) {
            budgets {
                id
            }
        }
    }`,
    variables: { projectId },
  });
});

Cypress.Commands.add("updateBudgetAllocation", (projectId, amount) => {
  return cy.wrap({
    query: `mutation ($projectId: Uuid!, $amount: Int!) {
          updateBudgetAllocation(projectId: $projectId, newRemainingAmountInUsd: $amount)
      }`,
    variables: { projectId, amount },
    wait: WAIT_LONG,
  });
});

Cypress.Commands.add("linkGithubRepoWithProject", (projectId, githubRepoId) => {
  return cy.wrap({
    query: `mutation($projectId: Uuid!, $githubRepoId: Int!) {
                linkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
            }`,
    variables: { projectId, githubRepoId },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("unlinkGithubRepoFromProject", (projectId, githubRepoId) => {
  return cy.wrap({
    query: `mutation($projectId: Uuid!, $githubRepoId: Int!) {
                unlinkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
            }`,
    variables: { projectId, githubRepoId },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("unassignProjectLead", (projectId, userId) => {
  return cy.wrap({
    query: `mutation($projectId: Uuid!, $userId: Uuid!) {
                unassignProjectLead(projectId: $projectId, userId: $userId)
            }`,
    variables: { projectId, userId },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("inviteProjectLeader", (projectId, githubUserId) => {
  return cy.wrap({
    query: `mutation($projectId: Uuid!, $githubUserId: Int!) {
                inviteProjectLeader(projectId: $projectId, githubUserId: $githubUserId)
            }`,
    variables: { projectId, githubUserId },
    wait: WAIT_SHORT,
  });
});

Cypress.Commands.add("acceptProjectLeaderInvitation", invitationId => {
  return cy.wrap({
    query: `mutation($invitationId: Uuid!) {
                acceptProjectLeaderInvitation(invitationId: $invitationId)
            }`,
    variables: { invitationId },
    wait: WAIT_SHORT,
  });
});
