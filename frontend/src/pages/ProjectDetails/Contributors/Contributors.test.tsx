import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import Contributors, { GET_PROJECT_CONTRIBUTORS_QUERY } from ".";
import { ContributorsTableFieldsFragment } from "src/__generated/graphql";

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

const mockPaymentRequest = {
  id: "request-1",
  amountInUsd: 1000,
  reason: {
    work_items: ["", ""],
  },
  budget: { id: "budget-id", projectId: TEST_PROJECT_ID },
};

const mockPaymentRequest2 = {
  id: "request-2",
  amountInUsd: 500,
  reason: {
    work_items: [""],
  },
  budget: { id: "budget-id", projectId: TEST_PROJECT_ID },
};

const contributor1: ContributorsTableFieldsFragment = {
  __typename: "User",
  id: 123456,
  avatarUrl: "avatar_url",
  login: "ofux",
  user: null,
  paymentRequests: [mockPaymentRequest, mockPaymentRequest],
};

const contributor2: ContributorsTableFieldsFragment = {
  __typename: "User",
  id: 123457,
  avatarUrl: "avatar_url",
  login: "AnthonyBuisset",
  user: null,
  paymentRequests: [mockPaymentRequest2],
};

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECT_CONTRIBUTORS_QUERY,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          id: TEST_PROJECT_ID,
          name: "test-project",
          githubRepo: {
            content: {
              contributors: [contributor1, contributor2],
            },
          },
        },
      },
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
  });
});
