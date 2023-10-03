import { ComponentProps } from "react";
import { GithubLoginLink } from "src/components/GithubLoginLink/GithubLoginLink";

export default {
  title: "GithubLoginLink",
  component: GithubLoginLink,
  args: {
    author: {
      id: "123",
      login: "test-username",
      avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
    },
  },
};

export const Default = {
  render: (args: ComponentProps<typeof GithubLoginLink>) => (
    <div className="flex h-64 items-center justify-center">
      <GithubLoginLink {...args} />
    </div>
  ),
};
