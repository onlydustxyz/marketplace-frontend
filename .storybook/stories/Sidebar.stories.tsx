import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProjectDetailsTab } from "src/pages/ProjectDetails/Sidebar";
import { withRouter } from "storybook-addon-react-router-v6";
import View from "src/pages/ProjectDetails/Sidebar/View";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
type Project = UseGetProjectBySlugResponse;

export default {
  title: "ProjectsSidebar",
  component: View,
  decorators: [withRouter],
} as ComponentMeta<typeof View>;

const availableTabs: ProjectDetailsTab[] = [
  {
    label: "Overview",
    path: "overview",
  },
  {
    label: "Contributors",
    path: "contributors",
  },
];

const currentProject: Project = {
  id: "b692a29f-4e4f-4607-aece-054f562b13cf",
  slug: "baribicane",
  name: "Baribicane",
  remainingUsdBudget: 0,
  createdAt: "2023-11-09T16:23:38.223Z",
  shortDescription: "Second best project ever",
  longDescription: "Second best project ever long desc",
  logoUrl: "",
  moreInfoUrl: "http://barbicane.fr/",
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
      id: 58205251,
      isCurrentUserAdmin: true,
      owner: "Barbicane-fr",
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

const otherProject: Project = {
  id: "b692a29f-4e4f-4607-aece-054f562b13cf",
  slug: "baribicane",
  name: "Baribicane",
  remainingUsdBudget: 0,
  createdAt: "2023-11-09T16:23:38.223Z",
  shortDescription: "Second best project ever",
  longDescription: "Second best project ever long desc",
  logoUrl: "",
  moreInfoUrl: "http://barbicane.fr/",
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
      isIncludedInProject: true,
    },
  ],
  organizations: [
    {
      id: 58205251,
      login: "Barbicane-fr",
      owner: "owner-id",
      avatarUrl: "https://avatars.githubusercontent.com/u/58205251?v=4",
      htmlUrl: "https://github.com/Barbicane-fr",
      name: "Barbicane",
      installationId: 411,
      installed: true,
      isCurrentUserAdmin: true,
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

const expandable = true;
const pendingProjects: Project[] = [];
const projects = [currentProject, otherProject];

const Template: ComponentStory<typeof View> = () => (
  <View
    {...{
      expandable,
      currentProject,
      pendingProjects,
      projects,
      availableTabs,
      projectLead: true,
    }}
  />
);

export const Default = Template.bind({});
