import { responsiveChromatic } from "src/test/utils";
import { withRouter } from "storybook-addon-react-router-v6";

import ProjectCard, { Project } from ".";

export default {
  title: "ProjectCard",
  parameters: responsiveChromatic,
  decorators: [withRouter],
};

export const Default = {
  render: () => (
    <ProjectCard {...props(args)} pendingInvitations={args.withInvitation ? props(args).pendingInvitations : []} />
  ),
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const Hiring = {
  render: () => (
    <ProjectCard
      {...props({ ...args, hiring: true })}
      pendingInvitations={args.withInvitation ? props(args).pendingInvitations : []}
    />
  ),
  parameters: {
    backgrounds: { default: "space" },
  },
};

const props = (args: {
  name: string;
  shortDescription: string;
  projectLeadsCount: number;
  hiring: boolean;
}): Project => ({
  id: 123,
  contributorsAggregate: { aggregate: { count: 4 } },
  projectDetails: {
    projectId: "123",
    name: args.name,
    telegramLink: "https://app.onlydust.xyz/projects/92f022a9-dbd8-446f-a2a5-b161ccb4541c",
    shortDescription: args.shortDescription,
    logoUrl: "https://avatars.githubusercontent.com/u/115809607?v=4",
    hiring: args.hiring,
    rank: 0,
  },
  projectLeads: [
    {
      userId: "user-1",
      projectId: "123",
      user: {
        id: "user-1",
        displayName: "oscarwroche",
        avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
      },
    },
    {
      userId: "user-2",
      projectId: "123",
      user: {
        id: "user-2",
        displayName: "AnthonyBuisset",
        avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
      },
    },
    {
      userId: "user-3",
      projectId: "123",
      user: {
        id: "user-3",
        displayName: "ofux",
        avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      },
    },
    {
      userId: "user-4",
      projectId: "123",
      user: {
        id: "user-4",
        displayName: "tdelabro",
        avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
      },
    },
    {
      userId: "user-5",
      projectId: "123",
      user: {
        id: "user-5",
        displayName: "BernardStanislas",
        avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
      },
    },
    {
      userId: "user-6",
      projectId: "123",
      user: {
        id: "user-6",
        displayName: "gregcha",
        avatarUrl: "https://avatars.githubusercontent.com/u/8642470?v=4",
      },
    },
  ].slice(0, args.projectLeadsCount),
  githubRepos: [
    {
      githubRepoId: 12345,
      projectId: "123",
      repo: {
        id: 12345,
        languages: { Ejs: 2200, Rust: 1000 },
      },
    },
    {
      githubRepoId: 666,
      projectId: "123",
      repo: {
        id: 666,
        languages: { Pascal: 1000000, Rust: 3000 },
      },
    },
  ],
  budgets: [
    {
      id: "budget-1",
    },
  ],
  budgetsAggregate: {
    aggregate: {
      sum: {
        spentAmount: 47550,
        initialAmount: 100000,
      },
    },
  },
  pendingInvitations: [{ id: "croute", githubUserId: "github-user-id" }],
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
  hiring: false,
  rank: 0,
};
