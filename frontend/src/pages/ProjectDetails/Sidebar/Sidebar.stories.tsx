import { ComponentStory, ComponentMeta } from "@storybook/react";
import { range } from "lodash";
import { ProjectDetailsTab } from "src/pages/ProjectDetails/Sidebar";
import { GithubUserFragment, ProjectContributorsFragment } from "src/__generated/graphql";
import { withRouter } from "storybook-addon-react-router-v6";
import { ProjectDetails } from "..";
import View, { SidebarProjectDetails } from "./View";

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

const contributors: GithubUserFragment[] = range(4).map(id => ({
  id,
  login: `user-${id}`,
  avatarUrl: "",
  htmlUrl: "",
  user: null,
}));

const currentProject: ProjectDetails & SidebarProjectDetails & ProjectContributorsFragment = {
  id: "test-project-id",
  name: "Our project",
  logoUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
  leads: [
    {
      id: "leader-id",
      displayName: "Leader",
      avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
    },
  ],
  sponsors: [],
  languages: {},
  withInvitation: false,
  githubRepos: [
    {
      projectId: "test-project-id",
      githubRepoId: 123456,
      repoContributors: contributors.map(user => ({ user })),
    },
  ],
  budgets: [],
};

const otherProject: ProjectDetails & SidebarProjectDetails & ProjectContributorsFragment = {
  id: "other-project-id",
  name: "Other project",
  logoUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
  leads: [
    {
      id: "leader-id",
      displayName: "Leader",
      avatarUrl: "https://avatars.githubusercontent.com/u/98735558?v=4",
    },
  ],
  sponsors: [],
  languages: {},
  withInvitation: false,
  githubRepos: [
    {
      projectId: "other-project-id",
      githubRepoId: 123456,
      repoContributors: contributors.map(user => ({ user })),
    },
  ],
  budgets: [],
};

const expandable = true;
const allProjects = [currentProject, otherProject];

const Template: ComponentStory<typeof View> = () => (
  <View
    {...{
      expandable,
      currentProject,
      allProjects,
      availableTabs,
      projectLead: true,
    }}
  />
);

export const Default = Template.bind({});
