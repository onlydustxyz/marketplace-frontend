import SidePanel from "src/components/SidePanel";
import ContributorProfileSidePanel from "src/App/Stacks/ContributorProfileSidePanel/View";
import { withRouter } from "storybook-addon-react-router-v6";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withToasterProvider from "../decorators/withToasterProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import withAuthProvider from "../decorators/withAuthProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import { UserProfile } from "src/api/Users/queries";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributorProfileSidePanel",
  component: ContributorProfileSidePanel,
  decorators: [
    withRouter,
    withToasterProvider,
    withSidePanelStackProvider,
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withMockedProvider(),
    withAuthProvider({ userId: USER_ID }),
    withQueryClientProvider,
  ],
};

const mockUserProfile: UserProfile = {
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  bio: "Contributing to awesome open source projects.",
  contacts: [
    {
      channel: "DISCORD",
      contact: "foobar@gmail.com",
      visibility: "private",
    },
  ],
  cover: "BLUE",
  createdAt: "2023-10-27T13:52:48.802Z",
  firstContributedAt: "2023-10-27T13:52:48.802Z",
  githubUserId: 595505,
  htmlUrl: "string",
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  lastSeenAt: "2023-10-27T13:52:48.802Z",
  location: "Paris, France",
  login: "ofux",
  projects: [
    {
      contributorCount: 163,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isLead: false,
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/2529199823275297272.jpg",
      name: "Verkle Tries",
      slug: "string",
      totalGranted: 25400,
      userContributionCount: 34,
      userLastContributedAt: "2023-10-27T13:52:48.802Z",
    },
  ],
  stats: {
    contributedProjectCount: 2,
    contributionCount: 104,
    contributionCountPerWeeks: [
      {
        codeReviewCount: 0,
        issueCount: 0,
        pullRequestCount: 0,
        week: 34,
        year: 2023,
      },
    ],
    contributionCountVariationSinceLastWeek: 0,
    leadedProjectCount: 1,
    totalsEarned: {
      details: [
        {
          currency: "APT",
          totalAmount: 0,
          totalDollarsEquivalent: 0,
        },
      ],
      totalAmount: 0,
    },
  },
  technologies: { Rust: 91283, Go: 12388, Java: 1233 },
  website: "string",
};

export const Default = {
  render: () => (
    <SidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    >
      <ContributorProfileSidePanel
        userProfile={mockUserProfile}
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const Own = {
  render: () => (
    <SidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    >
      <ContributorProfileSidePanel
        userProfile={mockUserProfile}
        isOwn
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const NotSignedUp = {
  render: () => (
    <SidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    >
      <ContributorProfileSidePanel
        userProfile={mockUserProfile}
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const Minimalist = {
  render: () => (
    <SidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    >
      <ContributorProfileSidePanel
        userProfile={mockUserProfile}
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
