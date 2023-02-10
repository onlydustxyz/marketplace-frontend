import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentsList from "./List";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { GithubUserFragment, PaymentRequestFragment } from "src/__generated/graphql";
import { GET_GITHUB_USER_QUERY } from "src/hooks/useGithubUser";

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
  payments: [
    {
      amount: 100,
      currencyCode: "USD",
    },
    {
      amount: 100,
      currencyCode: "USD",
    },
  ],
  amountInUsd: 200,
  reason: { work_items: ["link_to_pr"] },
  requestedAt: new Date(),
};

const githubUserMock: GithubUserFragment = {
  __typename: "User",
  id: GITHUB_USER_ID,
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
};

const graphQlMocks = [
  {
    request: {
      query: GET_GITHUB_USER_QUERY,
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
    expect(await screen.findByText(paymentRequestMock.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(githubUserMock.login)).toBeInTheDocument();
    expect(await screen.findByText("$200")).toBeInTheDocument();
    expect(await screen.findByText(/complete/i)).toBeInTheDocument();
    expect(await screen.findByText(/a few seconds ago/i)).toBeInTheDocument();
  });
});
