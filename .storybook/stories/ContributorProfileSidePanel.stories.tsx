import { OwnUserProfileDetailsFragment, ProfileProjectFragment, UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/View";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import { withRouter } from "storybook-addon-react-router-v6";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withToasterProvider from "../decorators/withToasterProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";

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
  ],
};

const profileFull: UserProfileFragment = {
  __typename: "UserProfiles",
  githubUserId: 43467246,
  login: "AnthonyBuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  htmlUrl: "https://github.com/AnthonyBuisset",
  location: "Nice, France",
  bio: "Anthony Buisset est né le 17 décembre 1991 au Mans. Il commence la pétanque à l'âge de trois ans. Il pratique d'abord ce sport au sein de sa famille, avec son grand-père et son père.",
  createdAt: "2023-05-10T08:46:57.965219+00:00",
  lastSeen: "2023-05-20T10:10:10.965219+00:00",
  contactInformations: [],
  contacts: {
    email: { contact: "anthony@foobar.org", public: true },
    telegram: { contact: "https://telegram.me/antho", public: true },
    twitter: { contact: "https://twitter.com/antho", public: true },
    discord: { contact: "ANTHO123", public: true },
    linkedin: { contact: "https://linkedin.com/antho", public: true },
    whatsapp: { contact: "+33612345678", public: true },
  },
  website: "https://antho-petanque.com",
  cover: "cyan",
  languages: {
    Rust: 123,
    Makefile: 12,
    Typescript: 4456,
    Python: 120,
    Shell: 56,
    Go: 250,
    Cairo: 100,
    Solidity: 20,
  },
  contributionCounts: [
    { year: 2023, week: 12, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 13, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 14, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 15, pullRequestCount: 2, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 16, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 17, pullRequestCount: 5, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 18, pullRequestCount: 3, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 19, pullRequestCount: 4, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 20, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 21, pullRequestCount: 2, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 22, pullRequestCount: 5, issueCount: 0, codeReviewCount: 3 },
    { year: 2023, week: 23, pullRequestCount: 5, issueCount: 5, codeReviewCount: 3 },
  ],
  projectsLeaded: [
    { projectId: "", assignedAt: "2023-03-15T11:00:11.674+00:00", project: {} as ProfileProjectFragment },
  ],
  contributionStats: [],
  contributionStatsAggregate: {
    aggregate: { min: { minDate: "2023-02-31T11:31:09.674+00:00" }, sum: { totalCount: 124 } },
  },
  paymentStats: [],
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 23000 } } },
  projectsContributed: [],
  projectsContributedAggregate: { aggregate: { count: 3 } },
};

const mockRestFulProfile: Profile = {
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
        setOpen={() => {
          return;
        }}
        gqlProfile={profileFull as UserProfileFragment & OwnUserProfileDetailsFragment}
        restFulProfile={mockRestFulProfile}
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
        setOpen={() => {
          return;
        }}
        gqlProfile={profileFull as UserProfileFragment & OwnUserProfileDetailsFragment}
        restFulProfile={mockRestFulProfile}
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
        setOpen={() => {
          return;
        }}
        gqlProfile={profileFull as UserProfileFragment & OwnUserProfileDetailsFragment}
        restFulProfile={mockRestFulProfile}
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
        setOpen={() => {
          return;
        }}
        gqlProfile={profileFull as UserProfileFragment & OwnUserProfileDetailsFragment}
        restFulProfile={mockRestFulProfile}
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
