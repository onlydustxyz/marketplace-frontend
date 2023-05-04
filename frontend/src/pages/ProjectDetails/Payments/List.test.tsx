import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentsList from "./List";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { GetGithubUserDocument, GithubUserFragment, PaymentRequestFragment } from "src/__generated/graphql";

expect.extend(matchers);

const TEST_USER_ID = "test-user-id";
const GITHUB_USER_ID = 12345;

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

const paymentRequestMock: PaymentRequestFragment = {
  __typename: "PaymentRequests",
  id: "705e6b37-d0ee-4e87-b681-7009dd691965",
  recipientId: GITHUB_USER_ID,
  paymentsAggregate: { aggregate: { sum: { amount: 200 } } },
  amountInUsd: 200,
  workItemsAggregate: { aggregate: { count: 1 } },
  requestedAt: new Date(),
};

const githubUserMock: GithubUserFragment = {
  __typename: "User",
  id: GITHUB_USER_ID,
  login: "ofux",
  htmlUrl: "https://github.com/ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  user: null,
};

const graphQlMocks = [
  {
    request: {
      query: GetGithubUserDocument,
      variables: {
        githubUserId: GITHUB_USER_ID,
      },
    },
    result: {
      data: {
        fetchUserDetailsById: githubUserMock,
      },
    },
  },
];

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

describe("PaymentsList page", () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<PaymentsList />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: {
          payments: [paymentRequestMock],
          budget: {
            initialAmount: 100,
            remainingAmount: 40,
          },
        },
      }),
    });
  });

  it("should render the new payment buttons", async () => {
    await screen.findByText(/new payment/i);
  });

  it("should render the remaining budget", async () => {
    await screen.findByText(/remaining budget/i);
  });

  it("should render the payments table", async () => {
    expect(await screen.findByText("#705E6 · 1 item")).toBeInTheDocument();
    expect(await screen.findByText(githubUserMock.login)).toBeInTheDocument();
    expect(await screen.findByText("$200")).toBeInTheDocument();
    expect(await screen.findByText(/complete/i)).toBeInTheDocument();
    expect(await screen.findByText(/a few seconds ago/i)).toBeInTheDocument();
  });
});
