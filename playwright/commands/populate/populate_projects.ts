import { projects as projectFixtures } from "../../fixtures/projects";
import { repos } from "../../fixtures/repos";
import { User, Project, ProjectFixture, Sponsor, Repo } from "../../types";
import {
  CreateProjectMutation,
  CreateProjectDocument,
  CreateProjectMutationVariables,
  InviteProjectLeaderDocument,
  InviteProjectLeaderMutation,
  InviteProjectLeaderMutationVariables,
} from "../../__generated/graphql";
import { mutateAsAdmin } from "../common";
import { addProjectLeader, linkRepo } from "../project";

export const populateProjects = async (users: Record<string, User>, sponsors: Record<string, Sponsor>) => {
  Object.values(projectFixtures).map(p => {});
};

const populateProject = async (project: ProjectFixture, users: Record<string, User>) => {
  const { data: projectId } = await mutateAsAdmin<CreateProjectMutation, CreateProjectMutationVariables>({
    mutation: CreateProjectDocument,
    variables: {
      projectName: project.name,
      ...project,
    },
  });

  if (!projectId) {
    throw new Error(`Unable to create project ${project.name}`);
  }

  const leaderPromises = project.leaders?.map(leaderKey => {
    const leader = users[leaderKey];
    if (!leader) {
      throw new Error(`User ${leaderKey} does not exist in users fixture`);
    }
    return addProjectLeader(projectId, users[leader].github.id);
  });

  const invitePromises = project.pendingLeaderInvitations?.map(leader => {
    const pendingLeader = users[leader];
    if (!pendingLeader) {
      throw new Error(`User ${leader} does not exist in users fixture`);
    }

    return mutateAsAdmin<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>({
      mutation: InviteProjectLeaderDocument,
      variables: { projectId, githubUserId: pendingLeader.github.id },
    });
  });

  const repoPromises = project.repos?.map(repoKey => {
    const repo = repos[repoKey];
    if (!repo) {
      throw new Error(`Repo ${repoKey} does not exist in repos fixture`);
    }
    return linkRepo(projectId, repo.id);
  }

  const sponsorPromises = project.sponsors?.map(sponsorName => {
    const sponsor = sponsors.get(sponsorName);
    if (!sponsor) {
      throw new Error(`Sponsor ${sponsorName} does not exist in sponsors fixture`);
    }
    return mutate(projectId, sponsor.id);
  })
};
