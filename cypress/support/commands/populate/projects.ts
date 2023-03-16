import { Url, Uuid } from "../common";
import { User } from "./users";
import { Sponsor } from "./sponsors";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      populateProjects(): Chainable<Map<string, Project>>;
    }
  }
}

export type Project = {
  id?: Uuid;
  name: string;
  shortDescription: string;
  longDescription: string;
  telegramLink?: Url;
  logoUrl?: Url;
  initialBudget?: number;
  leaders?: string[];
  pendingLeaderInvitations?: string[];
  repos: string[];
  sponsors: string[];
};

export type Repo = {
  id: number;
  name: string;
  owner: string;
  languages: Map<string, number>;
};

Cypress.Commands.add("populateProjects", function () {
  cy.get("@sponsors").then((_sponsors: any) => {
    const sponsors = new Map<string, Sponsor>(Object.entries(_sponsors));

    cy.get("@users").then((_users: any) => {
      const users = new Map<string, User>(Object.entries(_users));

      cy.fixture("projects.json").then((_projects: any) => {
        const projects = new Map<string, Project>(Object.entries(_projects));
        const augmented_projects = new Map<string, Project>();

        cy.fixture("repos.json").then((_repos: any) => {
          const repos = new Map<string, Repo>(Object.entries(_repos));

          for (const [projectName, project] of projects) {
            cy.createProject(
              projectName,
              project.telegramLink,
              project.logoUrl,
              project.shortDescription,
              project.longDescription
            ).then(projectId => {
              augmented_projects.set(projectName, {
                id: projectId,
                name: projectName,
                ...project,
              });

              if (project.initialBudget !== undefined) {
                cy.wrap(projectId).withBudget(project.initialBudget);
              }

              for (const leaderKey of project.leaders || []) {
                const leader = users.get(leaderKey);
                if (!leader) {
                  throw new Error(`User ${leaderKey} does not exist in users fixture`);
                }
                cy.wrap(projectId).withLeader(leader);
              }

              for (const pendingLeaderKey of project.pendingLeaderInvitations || []) {
                const pendingLeader = users.get(pendingLeaderKey);
                if (!pendingLeader) {
                  throw new Error(`User ${pendingLeaderKey} does not exist in users fixture`);
                }
                if ((project.leaders || []).includes(pendingLeaderKey)) {
                  throw new Error(
                    `User ${pendingLeaderKey} is both in leaders array and pendingLeaderInvitations array. This is not allowed.`
                  );
                }
                cy.inviteProjectLeader(projectId, pendingLeader.github.id).asAdmin().data("inviteProjectLeader");
              }

              for (const repoKey of project.repos || []) {
                const repo = repos.get(repoKey);
                if (!repo) {
                  throw new Error(`Repo ${repoKey} does not exist in repos fixture`);
                }
                cy.wrap(projectId).withRepo(repo.id);
              }

              for (const sponsorName of project.sponsors || []) {
                const sponsor = sponsors.get(sponsorName);
                if (!sponsor) {
                  throw new Error(`Sponsor ${sponsorName} does not exist in sponsors fixture`);
                }
                cy.addSponsorToProject(projectId, sponsor.id);
              }
            });
          }
          cy.then(() => {
            cy.writeFile("cypress/fixtures/__generated/projects.json", Object.fromEntries(augmented_projects));
            cy.wrap(Object.fromEntries(augmented_projects)).as("projects");
          });
        });
      });
    });
  });
});
