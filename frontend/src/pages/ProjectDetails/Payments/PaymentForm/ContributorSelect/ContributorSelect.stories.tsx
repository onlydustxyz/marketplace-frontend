import { ComponentStory } from "@storybook/react";
import { GithubContributorFragment } from "src/__generated/graphql";

import ContributorSelectView from "./View";

export default {
  title: "ContributorsSelect",
};

const filteredContributors: (GithubContributorFragment & { unpaidMergedPullsCount?: number })[] = [
  {
    id: 1111,
    login: "antho",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    user: null,
    unpaidMergedPullsCount: 3,
  },
  {
    id: 2222,
    login: "stan",
    avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
    user: { userId: "user-id" },
  },
  {
    id: 3333,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    user: null,
    unpaidMergedPullsCount: 10,
  },
];

const filteredExternalContributors: GithubContributorFragment[] = [
  {
    id: 4444,
    login: "oscar",
    avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
    user: { userId: "user-id" },
  },
  {
    id: 5555,
    login: "gregoire",
    avatarUrl: "https://avatars.githubusercontent.com/u/8642470?v=4",
    user: { userId: "user-id" },
  },
  {
    id: 6666,
    login: "timothee",
    avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
    user: { userId: "user-id" },
  },
];

const Template: ComponentStory<typeof ContributorSelectView> = () => {
  return (
    <div className="w-full relative">
      <ContributorSelectView {...args} />
    </div>
  );
};

const args = {
  selectedGithubHandle: "test",
  setSelectedGithubHandle: Function.prototype(),
  githubHandleSubstring: "test",
  setGithubHandleSubstring: Function.prototype(),
  filteredContributors,
  filteredExternalContributors,
  isSearchGithubUsersByHandleSubstringQueryLoading: false,
  contributor: filteredContributors[0],
};

export const Default = Template.bind({});
Default.args = args;
