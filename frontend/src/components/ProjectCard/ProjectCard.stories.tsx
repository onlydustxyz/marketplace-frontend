import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectCard from ".";

export default {
  title: "ProjectCard",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = args => (
  <div className="w-2/3">
    <ProjectCard {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  name: "ZeroSync",
  projectDetails: {
    telegramLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
    description:
      "Don't trust. Verify. ZeroSync allows to verify Bitcoin's chain state in an instant. No need to download hundreds of gigabytes of blocks. A compact cryptographic proof suffices to validate the entire history of transactions and everyone's current balances.",
    logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
  },
  projectLeads: [
    {
      user: {
        displayName: "oscar666",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
  ],
  githubRepo: {
    owner: "facebook",
    name: "react",
    content: {
      contributors: [{ login: "oscar666", avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4" }],
      logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
    },
    languages: { Ejs: 2200, Rust: 1000 },
  },
  totalSpentAmountInUsd: 47550,
};
