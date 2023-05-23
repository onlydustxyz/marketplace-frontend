import { projects as projectFixtures } from "../../fixtures/data/projects";
import { repos } from "../../fixtures/data/repos";
import { zip } from "lodash";
import { User, ProjectFixture, Sponsor, Project } from "../../types";
import {
  CreateProjectMutation,
  CreateProjectDocument,
  CreateProjectMutationVariables,
  InviteProjectLeaderDocument,
  InviteProjectLeaderMutation,
  InviteProjectLeaderMutationVariables,
  AddSponsorToProjectDocument,
  AddSponsorToProjectMutation,
  AddSponsorToProjectMutationVariables,
} from "../../__generated/graphql";
import { mutateAsAdmin, waitEvents } from "../common";
import { addProjectLeader, linkRepo } from "../project";

export const populateProjects = async (
  users: Record<string, User>,
  sponsors: Record<string, Sponsor>
): Promise<Record<string, Project>> => {
  const promises = Object.values(projectFixtures).map(p => populateProject(p, users, sponsors));
  const projects = await Promise.all(promises);
  return Object.fromEntries(zip(Object.keys(projectFixtures), projects));
};

const populateProject = async (
  project: ProjectFixture,
  users: Record<string, User>,
  sponsors: Record<string, Sponsor>
) => {
  const { data } = await mutateAsAdmin<CreateProjectMutation, CreateProjectMutationVariables>({
    mutation: CreateProjectDocument,
    variables: {
      projectName: project.name,
      hiring: project.hiring ?? null,
      ...project,
    },
  });
  await waitEvents();

  const projectId = data?.createProject;

  const leaderPromises =
    project.leaders?.map(leaderKey => {
      const leader = users[leaderKey];
      if (!leader) {
        throw new Error(`User ${leaderKey} does not exist in users fixture`);
      }
      return addProjectLeader(projectId, leader.github.id, leader.token);
    }) || [];

  const invitePromises =
    project.pendingLeaderInvitations?.map(leader => {
      const pendingLeader = users[leader];
      if (!pendingLeader) {
        throw new Error(`User ${leader} does not exist in users fixture`);
      }
      return mutateAsAdmin<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>({
        mutation: InviteProjectLeaderDocument,
        variables: { projectId, githubUserId: pendingLeader.github.id },
      });
    }) || [];

  const repoPromises =
    project.repos?.map(repoKey => {
      const repo = repos[repoKey];
      if (!repo) {
        throw new Error(`Repo ${repoKey} does not exist in repos fixture`);
      }
      return linkRepo(projectId, repo.id);
    }) || [];

  const sponsorPromises =
    project.sponsors?.map(sponsorName => {
      const sponsor = sponsors[sponsorName];
      if (!sponsor) {
        throw new Error(`Sponsor ${sponsorName} does not exist in sponsors fixture`);
      }
      return mutateAsAdmin<AddSponsorToProjectMutation, AddSponsorToProjectMutationVariables>({
        mutation: AddSponsorToProjectDocument,
        variables: { projectId, sponsorId: sponsor.id },
      });
    }) || [];

  await Promise.all([...leaderPromises, ...invitePromises, ...repoPromises, ...sponsorPromises]);

  return {
    id: projectId,
    ...project,
  };
};
