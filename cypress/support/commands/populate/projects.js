Cypress.Commands.add("populateProjects", function () {
  cy.get("@users").then(users => {
    cy.fixture("projects.json").then(projects => {
      cy.fixture("repos.json").then(repos => {
        const augmented_projects = {};

        for (const [projectName, project] of Object.entries(projects)) {
          cy.createProject(
            projectName,
            project.telegramLink,
            project.logoUrl,
            project.shortDescription,
            project.longDescription
          ).then(projectId => {
            augmented_projects[projectName] = {
              id: projectId,
              name: projectName,
              ...project,
            };

            if (project.initialBudget !== undefined) {
              cy.wrap(projectId).withBudget(project.initialBudget);
            }

            for (const leaderKey of project.leaders) {
              const leader = users[leaderKey];
              if (!leader) {
                throw new Error(`User ${leaderKey} does not exist in users fixture`);
              }
              cy.wrap(projectId).withLeader(leader);
            }

            for (const repoKey of project.repos) {
              const repo = repos[repoKey];
              if (!repo) {
                throw new Error(`Repo ${repoKey} does not exist in repos fixture`);
              }
              cy.wrap(projectId).withRepo(repo.id);
            }
          });
        }

        cy.wrap(augmented_projects).as("projects");
      });
    });
  });
});
