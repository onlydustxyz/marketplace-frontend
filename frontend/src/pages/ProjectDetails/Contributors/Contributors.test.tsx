import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { RoutePaths } from "src/App";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import Contributors, { GET_PROJECT_CONTRIBUTORS_QUERY } from ".";

expect.extend(matchers);

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
  amountInUsd: 1000,
  reason: {
    work_items: ["", ""],
  },
  recipient: {
    userId: TEST_USER_ID,
  },
  githubRecipient: {
    login: "ofux",
    avatarUrl: "avatar_url",
  },
};

const mockPaymentRequest2 = {
  amountInUsd: 500,
  reason: {
    work_items: [""],
  },
  recipient: null,
  githubRecipient: {
    login: "AnthonyBuisset",
    avatarUrl: "avatar_url",
  },
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
        paymentRequests: [mockPaymentRequest, mockPaymentRequest, mockPaymentRequest2],
      },
    },
  },
];

describe('"ProjectDetails" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<Contributors projectId={TEST_PROJECT_ID} />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.ProjectDetails}/test-project-id`,
        mocks: graphQlMocks,
      }),
    });
  });

  it("should render the contributors table", async () => {
    await screen.findByText(/contributors/i);
    await screen.findByText(/2000/i);
    await screen.findByText(/500/i);
  });
});
