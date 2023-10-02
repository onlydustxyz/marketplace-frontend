import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import Contributors from ".";
import {
  ContributorFragment,
  GetProjectContributorsDocument,
  GetProjectContributorsQueryResult,
} from "src/__generated/graphql";

expect.extend(matchers);

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_BASIC_TEST_VALUE }),
  },
}));

const TEST_USER_ID = "test-user-id";
const TEST_PROJECT_ID = "test-project-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

const contributor1: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 123456,
  avatarUrl: "avatar_url",
  login: "ofux",
  userId: null,
  contributionStatsAggregate: {
    aggregate: { sum: { codeReviewCount: 0, issueCount: 1, pullRequestCount: 3, totalCount: 4 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 2000 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 3 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};

const contributor2: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 123457,
  avatarUrl: "avatar_url",
  login: "AnthonyBuisset",
  userId: null,
  contributionStatsAggregate: {
    aggregate: { sum: { codeReviewCount: 0, issueCount: 1, pullRequestCount: 3, totalCount: 1 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 500 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 3 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 3 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};

const contributor3: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 123458,
  avatarUrl: "avatar_url",
  login: "oscarwroche",
  userId: null,
  contributionStatsAggregate: {
    aggregate: { sum: { codeReviewCount: 0, issueCount: 0, pullRequestCount: 0, totalCount: 0 } },
  },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
  projectsRewardedAggregate: { aggregate: { sum: { rewardCount: 0 } } },
  completedUnpaidPullRequestsAggregate: { aggregate: { count: 0 } },
  completedUnpaidIssuesAggregate: { aggregate: { count: 0 } },
  completedUnpaidCodeReviewsAggregate: { aggregate: { count: 0 } },
};

const graphQlMocks = [
  {
    request: {
      query: GetProjectContributorsDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsContributors: [contributor1, contributor2, contributor3].map(user => ({ user })),
      } as GetProjectContributorsQueryResult["data"],
    },
  },
];

describe('"ProjectDetails" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<Contributors />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { projectId: TEST_PROJECT_ID },
      }),
    });
  });

  it("should render the contributors table", async () => {
    await screen.findByText(/contributors/i);
    await screen.findByText(/2,000/i);
    await screen.findByText(/500/i);
    await screen.findByText(/ofux/i);
    await screen.findByText(/AnthonyBuisset/i);
    await screen.findByText(/oscarwroche/i);
  });
});
