import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import { responsiveChromatic } from "src/test/utils";
import { withRouter } from "storybook-addon-react-router-v6";

import ProjectCard from ".";

export default {
  title: "ProjectCard",
  parameters: responsiveChromatic,
  decorators: [withRouter],
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <ProjectCard {...props(args)} pendingInvitations={args.withInvitation ? props(args).pendingInvitations : []} />
);

export const Default = Template.bind({});

const props = (args: { name: string; shortDescription: string; projectLeadsCount: number }) => ({
  id: 123,
  projectDetails: {
    projectId: "123",
    name: args.name,
    telegramLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
    shortDescription: args.shortDescription,
    logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
  },
  projectLeads: [
    {
      userId: "user-1",
      user: {
        displayName: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
    {
      userId: "user-2",
      user: {
        displayName: "AnthonyBuisset",
        avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      },
    },
    {
      userId: "user-3",
      user: {
        displayName: "ofux",
        avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      },
    },
    {
      userId: "user-4",
      user: {
        displayName: "tdelabro",
        avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
      },
    },
    {
      userId: "user-5",
      user: {
        displayName: "BernardStanislas",
        avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
      },
    },
    {
      userId: "user-6",
      user: {
        displayName: "gregcha",
        avatarUrl: "https://avatars.githubusercontent.com/u/8642470?v=4",
      },
    },
  ].slice(0, args.projectLeadsCount),
  githubRepos: [
    {
      githubRepoId: 12345,
      githubRepoDetails: {
        id: 12345,
        owner: "facebook",
        name: "react",
        languages: { Ejs: 2200, Rust: 1000 },
        content: {
          id: 12345,
          logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
          contributors: [{ id: 100 }, { id: 837 }],
        },
      },
    },
    {
      githubRepoId: 666,
      githubRepoDetails: {
        id: 666,
        owner: "chuck",
        name: "norris",
        languages: { Pascal: 1000000, Rust: 3000 },
        content: {
          id: 666,
          logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
          contributors: [{ id: 100 }, { id: 777 }],
        },
      },
    },
  ],
  budgets: [{ id: "budget-1" }],
  budgetsAggregate: {
    aggregate: {
      sum: {
        spentAmount: 47550,
      },
    },
  },
  pendingInvitations: [{ id: "croute" }],
  projectSponsors: [
    {
      sponsor: {
        id: 1,
        name: "Starknet",
        logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg",
        url: "https://starkware.co/starknet/",
      },
    },
    {
      sponsor: {
        id: 2,
        name: "Ethereum Foundation",
        logoUrl: "https://logotyp.us/files/ethereum-foundation.svg",
        url: "https://ethereum.org/en/foundation/",
      },
    },
    {
      sponsor: {
        id: 3,
        name: "Theodo",
        logoUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/dd/Logo-theodo.png/280px-Logo-theodo.png",
        url: "https://www.theodo.fr/",
      },
    },
  ],
});

const args = {
  name: "ZeroSync",
  shortDescription:
    "Don't trust. Verify. ZeroSync allows to verify Bitcoin's chain state in an instant. No need to download hundreds of gigabytes of blocks. A compact cryptographic proof suffices to validate the entire history of transactions and everyone's current balances.",
  withInvitation: false,
  projectLeadsCount: 1,
};

Default.args = args;

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
