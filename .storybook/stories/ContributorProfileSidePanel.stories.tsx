import { OwnUserProfileDetailsFragment, ProfileProjectFragment, UserProfileFragment } from "src/__generated/graphql";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/View";
import { Project } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ProjectCard";
import { daysFromNow, minutesFromNow } from "src/utils/date";
import { withRouter } from "storybook-addon-react-router-v6";
import withToasterProvider from "../decorators/withToasterProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import SidePanel from "src/components/SidePanel";

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

const profileNotSignedUp: UserProfileFragment = {
  __typename: "UserProfiles",
  githubUserId: 43467246,
  login: "AnthonyBuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  htmlUrl: "https://github.com/AnthonyBuisset",
  location: null,
  bio: "Anthony Buisset est né le 17 décembre 1991 au Mans. Il commence la pétanque à l'âge de trois ans. Il pratique d'abord ce sport au sein de sa famille, avec son grand-père et son père.",
  createdAt: null,
  lastSeen: null,
  contactInformations: [],
  contacts: {
    email: { contact: "anthony@foobar.org", public: true },
    telegram: { contact: "https://telegram.me/antho", public: false },
    twitter: { contact: "https://twitter.com/antho", public: true },
    discord: { contact: "ANTHO123", public: true },
    linkedin: { contact: "https://linkedin.com/antho", public: false },
    whatsapp: { contact: "+33612345678", public: true },
  },
  website: null,
  cover: "blue",
  languages: {
    Rust: 123,
  },
  contributionCounts: [
    { year: 2023, week: 17, pullRequestCount: 4, issueCount: 1, codeReviewCount: 3 },
    { year: 2023, week: 20, pullRequestCount: 1, issueCount: 2, codeReviewCount: 3 },
    { year: 2023, week: 22, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
  ],
  projectsLeaded: [],
  contributionStats: [],
  contributionStatsAggregate: {
    aggregate: { min: { minDate: "2023-02-31T11:31:09.674+00:00" }, sum: { totalCount: 7 } },
  },
  paymentStats: [],
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 12000 } } },
  projectsContributed: [],
  projectsContributedAggregate: { aggregate: { count: 1 } },
};

const profileMinimalist: UserProfileFragment = {
  __typename: "UserProfiles",
  githubUserId: 595505,
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  htmlUrl: "https://github.com/ofux",
  location: null,
  bio: null,
  languages: {},
  createdAt: null,
  lastSeen: null,
  contactInformations: [],
  contacts: {
    email: { contact: null, public: null },
    telegram: { contact: null, public: null },
    twitter: { contact: null, public: null },
    discord: { contact: null, public: null },
    linkedin: { contact: null, public: null },
    whatsapp: { contact: null, public: null },
  },
  website: null,
  cover: "yellow",
  contributionCounts: [],
  projectsLeaded: [],
  contributionStats: [],
  contributionStatsAggregate: { aggregate: null },
  paymentStats: [],
  paymentStatsAggregate: { aggregate: null },
  projectsContributed: [],
  projectsContributedAggregate: { aggregate: { count: 0 } },
};

const kakarot: Project = {
  id: "project-1",
  key: "kakarot",
  name: "Kakarot",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8091241668368846468.jpg",
  contributorCount: 30,
  totalGranted: 110900,
  leadSince: daysFromNow(35),
  contributionCount: 5,
  lastContribution: daysFromNow(5),
};

const wtf: Project = {
  id: "project-2",
  key: "wtf-academy",
  name: "WTF Academy",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14124244604398090162.png",
  contributorCount: 16,
  totalGranted: 10900,
  contributionCount: 5,
  lastContribution: daysFromNow(5),
};

const checkpoint: Project = {
  id: "project-3",
  key: "checkpoint",
  name: "Checkpoint",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/9843934077283658210.png",
  contributorCount: 7,
  totalGranted: 8000,
  contributionCount: 13,
  lastContribution: minutesFromNow(180),
};

const poseidon: Project = {
  id: "project-4",
  key: "poseidon",
  name: "Poseidon",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6390638290266552080.png",
  contributorCount: 5,
  totalGranted: 13800,
  contributionCount: 106,
  lastContribution: minutesFromNow(3),
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
        userProfile={{
          profile: profileFull as UserProfileFragment & OwnUserProfileDetailsFragment,
          projects: [kakarot, wtf, checkpoint, poseidon],
          languages: ["Rust", "Go", "Typescript"],
          contributionCounts: [
            { year: 2023, week: 17, pullRequestCount: 4, issueCount: 1, codeReviewCount: 3 },
            { year: 2023, week: 20, pullRequestCount: 1, issueCount: 2, codeReviewCount: 3 },
            { year: 2023, week: 21, pullRequestCount: 4, issueCount: 0, codeReviewCount: 3 },
            { year: 2023, week: 22, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
          ],
          contributionCountVariationSinceLastWeek: 3,
        }}
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
        userProfile={{
          profile: {
            ...profileNotSignedUp,
            ...({
              cover: "magenta",
              completionScore: 65,
              weeklyAllocatedTime: null,
              lookingForAJob: null,
            } as OwnUserProfileDetailsFragment),
          } as UserProfileFragment & OwnUserProfileDetailsFragment,
          projects: [kakarot, wtf, checkpoint, poseidon],
          languages: ["Rust", "Go", "Typescript"],
          contributionCounts: [
            { year: 2023, week: 17, pullRequestCount: 4, issueCount: 1, codeReviewCount: 3 },
            { year: 2023, week: 20, pullRequestCount: 1, issueCount: 2, codeReviewCount: 3 },
            { year: 2023, week: 22, pullRequestCount: 1, issueCount: 0, codeReviewCount: 3 },
          ],
          contributionCountVariationSinceLastWeek: -3,
        }}
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
        userProfile={{
          profile: profileNotSignedUp as UserProfileFragment & OwnUserProfileDetailsFragment,
          projects: [wtf],
          languages: ["Rust", "Go", "Typescript"],
          contributionCounts: [],
          contributionCountVariationSinceLastWeek: 0,
        }}
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
        userProfile={{
          profile: profileMinimalist as UserProfileFragment & OwnUserProfileDetailsFragment,
          projects: [],
          languages: [],
          contributionCounts: [],
          contributionCountVariationSinceLastWeek: 0,
        }}
      />
    </SidePanel>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
