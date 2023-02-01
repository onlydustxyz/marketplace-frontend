import { MockedProvider } from "@apollo/client/testing";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { GithubUserFragment, PaymentRequestFragment } from "src/__generated/graphql";
import useGetPaymentRequests, {
  GET_GITHUB_USER_QUERY,
  PAYMENT_REQUESTS_FOR_PROJECT_SUBSCRIPTION,
} from "./useGetPaymentRequests";

const PROJECT_ID = "project-id";
const GITHUB_USER_ID_1 = 123456;
const GITHUB_USER_ID_2 = 654321;

const paymentRequestTemplate = {
  id: "705e6b37-d0ee-4e87-b681-7009dd691965",
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
};

const mockPaymentRequest = (githubUserId: number): PaymentRequestFragment => ({
  ...paymentRequestTemplate,
  __typename: "PaymentRequests",
  recipientId: githubUserId,
});

const mockGithubUser = (githubUserId: number): GithubUserFragment => ({
  __typename: "User",
  id: githubUserId,
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
});

const getPaymentRequestsMock = {
  request: {
    query: PAYMENT_REQUESTS_FOR_PROJECT_SUBSCRIPTION,
    variables: { projectId: PROJECT_ID },
  },
  result: {
    data: {
      projectsByPk: {
        budgets: [
          {
            initialAmount: 1000,
            remainingAmount: 400,
            paymentRequests: [
              mockPaymentRequest(GITHUB_USER_ID_1),
              mockPaymentRequest(GITHUB_USER_ID_1),
              mockPaymentRequest(GITHUB_USER_ID_2),
            ],
          },
        ],
      },
    },
  },
};

const mockGetGithubUserQuery = (githubUserId: number) => ({
  request: {
    query: GET_GITHUB_USER_QUERY,
    variables: {
      githubUserId: githubUserId,
    },
  },
  result: {
    data: {
      fetchUserDetailsById: mockGithubUser(githubUserId),
    },
  },
});

const render = (projectId: string) =>
  renderHook(() => useGetPaymentRequests(projectId), {
    wrapper: MockedProvider,
    initialProps: {
      mocks: [
        getPaymentRequestsMock,
        mockGetGithubUserQuery(GITHUB_USER_ID_1),
        mockGetGithubUserQuery(GITHUB_USER_ID_2),
      ],
    },
  });

describe("useGetPaymentRequests", () => {
  it("should return merge results between payment requests and github recipients", async () => {
    const { result } = render(PROJECT_ID);
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data?.budget).toEqual({ initialAmount: 1000, remainingAmount: 400 });
    expect(result.current.data?.paymentRequests).toHaveLength(3);
  });
});
