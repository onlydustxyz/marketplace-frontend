import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";

import ProjectCard from ".";

export default {
  title: "ProjectCard",
  argTypes: {
    width: { control: { type: "range", min: 800, max: 1200, step: 100 } },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <div style={{ width: args.width }}>
    <ProjectCard {...props} pendingInvitations={args.withInvitation ? props.pendingInvitations : []} />
  </div>
);

export const Default = Template.bind({});

const props = {
  id: 123,
  projectDetails: {
    projectId: "123",
    name: "ZeroSync",
    telegramLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
    description:
      "Don't trust. Verify. ZeroSync allows to verify Bitcoin's chain state in an instant. No need to download hundreds of gigabytes of blocks. A compact cryptographic proof suffices to validate the entire history of transactions and everyone's current balances.",
    logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
  },
  projectLeads: [
    {
      user: {
        displayName: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
  ],
  githubRepo: {
    id: 12345,
    owner: "facebook",
    name: "react",
    content: {
      id: 12345,
      contributors: [
        { login: "oscarwroche", avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4" },
        { login: "ofux", avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4" },
      ],
      logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
    },
    languages: { Ejs: 2200, Rust: 1000 },
  },
  budgetsAggregate: {
    aggregate: {
      sum: {
        spentAmount: 47550,
      },
    },
  },
  pendingInvitations: [{ id: "croute" }],
};

const args = {
  withInvitation: false,
  width: 800,
};

Default.args = args;

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
