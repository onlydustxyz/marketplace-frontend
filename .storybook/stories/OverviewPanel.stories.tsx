import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import withAuthProvider from "../decorators/withAuthProvider";
import OverviewPanel from "src/pages/ProjectDetails/Overview/components/OverviewPanel";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "OverviewPanel",
  decorators: [withAuthProvider({ userId: USER_ID })],
};

const project: UseGetProjectBySlugResponse = {
  id: "b692a29f-4e4f-4607-aece-054f562b13cf",
  slug: "baribicane",
  indexedAt: "2023-11-09T16:23:38.223Z",
  indexingComplete: true,
  name: "Baribicane",
  hasRemainingBudget: true,
  createdAt: "2023-11-09T16:23:38.223Z",
  shortDescription: "Second best project ever",
  longDescription: "Second best project ever long desc",
  logoUrl: "",
  moreInfos: [
    {
      url: "www.onlydust.xyz",
      value: "onlydust",
    },
  ],
  hiring: true,
  visibility: "PUBLIC",
  contributorCount: 1,
  topContributors: [
    {
      githubUserId: 16590657,
      login: "PierreOucif",
      htmlUrl: "https://github.com/PierreOucif",
      avatarUrl: "https://avatars.githubusercontent.com/u/16590657?v=4",
    },
  ],
  repos: [
    {
      id: 347315291,
      owner: "Barbicane-fr",
      name: "maston",
      description: "Open source java project providing simple kafka streams tools using Vavr",
      htmlUrl: "https://github.com/Barbicane-fr/maston",
      stars: 0,
      forkCount: 0,
      hasIssues: true,
      isIncludedInProject: false,
    },
  ],
  organizations: [
    {
      githubUserId: 58205251,
      isCurrentUserAdmin: true,
      login: "owner-id",
      avatarUrl: "https://avatars.githubusercontent.com/u/58205251?v=4",
      htmlUrl: "https://github.com/Barbicane-fr",
      name: "Barbicane",
      installationId: 411,
      installed: true,
      repos: [
        {
          id: 347315291,
          owner: "Barbicane-fr",
          name: "maston",
          description: "Open source java project providing simple kafka streams tools using Vavr",
          htmlUrl: "https://github.com/Barbicane-fr/maston",
          stars: 0,
          forkCount: 0,
          hasIssues: true,
          isIncludedInProject: true,
        },
      ],
    },
  ],
  leaders: [
    {
      githubUserId: 16590657,
      login: "PierreOucif",
      htmlUrl: "https://github.com/PierreOucif",
      avatarUrl: "https://avatars.githubusercontent.com/u/16590657?v=4",
      id: "41b46107-9e4c-4e31-8acf-8371e4ca566a",
    },
    {
      githubUserId: 17259618,
      login: "alexbeno",
      htmlUrl: "https://github.com/alexbeno",
      avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
      id: "9d2e92fd-451d-45c3-840a-7fb2290d0e92",
    },
  ],
  invitedLeaders: [
    {
      githubUserId: 22441392,
      login: "georgesbiaux",
      htmlUrl: "https://github.com/georgesbiaux",
      avatarUrl: "https://avatars.githubusercontent.com/u/22441392?v=4",
      id: "uuuid",
    },
  ],
  sponsors: [],
  technologies: {
    Java: 120886,
  },
  rewardSettings: {
    ignorePullRequests: false,
    ignoreIssues: false,
    ignoreCodeReviews: false,
    ignoreContributionsBefore: "2023-10-09T16:23:38.216Z",
  },
};

export const Default = {
  render: () => <OverviewPanel project={project} />,
};

export const WithPendingInvites = {
  render: () => <OverviewPanel project={project} />,
};
