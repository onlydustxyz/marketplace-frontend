import { ProfileProjectFragment, UserProfileFragment } from "src/__generated/graphql";
import ContributorProfileSidePanel from "./View";
import { Project } from "./ReadOnlyView/ProjectCard";
import { daysFromNow, minutesFromNow } from "src/utils/date";
import { withRouter } from "storybook-addon-react-router-v6";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";
import withSidePanelStackProvider from "src/test/storybook/decorators/withSidePanelStackProvider";
import withTokenSetProvider from "src/test/storybook/decorators/withTokenSetProvider";
import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";

export default {
  title: "ContributorProfileSidePanel",
  component: ContributorProfileSidePanel,
  decorators: [withRouter, withToasterProvider, withSidePanelStackProvider, withTokenSetProvider, withMockedProvider()],
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
  email: [{ contact: "anthony@foobar.org", public: true }],
  twitter: [{ contact: "https://twitter.com/antho", public: true }],
  telegram: [{ contact: "https://telegram.me/antho", public: true }],
  linkedin: [{ contact: "https://linkedin.com/antho", public: true }],
  discord: [{ contact: "ANTHO123", public: true }],
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
    { year: 2023, week: 12, paidCount: 0, unpaidCount: 0 },
    { year: 2023, week: 13, paidCount: 1, unpaidCount: 0 },
    { year: 2023, week: 14, paidCount: 0, unpaidCount: 0 },
    { year: 2023, week: 15, paidCount: 2, unpaidCount: 0 },
    { year: 2023, week: 16, paidCount: 1, unpaidCount: 0 },
    { year: 2023, week: 17, paidCount: 5, unpaidCount: 0 },
    { year: 2023, week: 18, paidCount: 3, unpaidCount: 0 },
    { year: 2023, week: 19, paidCount: 4, unpaidCount: 0 },
    { year: 2023, week: 20, paidCount: 1, unpaidCount: 0 },
    { year: 2023, week: 21, paidCount: 2, unpaidCount: 0 },
    { year: 2023, week: 22, paidCount: 5, unpaidCount: 0 },
    { year: 2023, week: 23, paidCount: 5, unpaidCount: 5 },
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
  email: [{ contact: "anthony@foobar.org", public: true }],
  twitter: [{ contact: "https://twitter.com/antho", public: true }],
  telegram: [],
  linkedin: [],
  discord: [{ contact: "ANTHO123", public: true }],
  website: null,
  cover: "blue",
  languages: {
    Rust: 123,
  },
  contributionCounts: [
    { year: 2023, week: 17, paidCount: 4, unpaidCount: 1 },
    { year: 2023, week: 20, paidCount: 1, unpaidCount: 2 },
    { year: 2023, week: 22, paidCount: 1, unpaidCount: 0 },
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
  email: [],
  twitter: [],
  telegram: [],
  linkedin: [],
  discord: [],
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
  name: "WTF Academy",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14124244604398090162.png",
  contributorCount: 16,
  totalGranted: 10900,
  contributionCount: 5,
  lastContribution: daysFromNow(5),
};

const checkpoint: Project = {
  id: "project-3",
  name: "Checkpoint",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/9843934077283658210.png",
  contributorCount: 7,
  totalGranted: 8000,
  contributionCount: 13,
  lastContribution: minutesFromNow(180),
};

const poseidon: Project = {
  id: "project-4",
  name: "Poseidon",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6390638290266552080.png",
  contributorCount: 5,
  totalGranted: 13800,
  contributionCount: 106,
  lastContribution: minutesFromNow(3),
};

export const Default = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      userProfile={{
        profile: profileFull,
        projects: [kakarot, wtf, checkpoint, poseidon],
        languages: ["Rust", "Go", "Typescript"],
        contributionCounts: [
          { year: 2023, week: 17, paidCount: 4, unpaidCount: 1 },
          { year: 2023, week: 20, paidCount: 1, unpaidCount: 2 },
          { year: 2023, week: 21, paidCount: 4, unpaidCount: 0 },
          { year: 2023, week: 22, paidCount: 1, unpaidCount: 0 },
        ],
        contributionCountVariationSinceLastWeek: 3,
      }}
    />
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const Own = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      userProfile={{
        profile: profileFull,
        projects: [kakarot, wtf, checkpoint, poseidon],
        languages: ["Rust", "Go", "Typescript"],
        contributionCounts: [
          { year: 2023, week: 17, paidCount: 4, unpaidCount: 1 },
          { year: 2023, week: 20, paidCount: 1, unpaidCount: 2 },
          { year: 2023, week: 22, paidCount: 1, unpaidCount: 0 },
        ],
        contributionCountVariationSinceLastWeek: -3,
      }}
      isOwn
    />
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const NotSignedUp = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      userProfile={{
        profile: profileNotSignedUp,
        projects: [wtf],
        languages: ["Rust", "Go", "Typescript"],
        contributionCounts: [],
        contributionCountVariationSinceLastWeek: 0,
      }}
    />
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

export const Minimalist = {
  render: () => (
    <ContributorProfileSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
      userProfile={{
        profile: profileMinimalist,
        projects: [],
        languages: [],
        contributionCounts: [],
        contributionCountVariationSinceLastWeek: 0,
      }}
    />
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
