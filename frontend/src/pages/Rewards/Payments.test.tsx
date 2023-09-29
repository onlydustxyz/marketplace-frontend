import { describe, expect, it, Mock, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import RewardsPage from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { GetPaymentRequestsDocument, UserPaymentRequestFragment, WorkItemType } from "src/__generated/graphql";

expect.extend(matchers);

const userId = "33f15d41-5383-4a73-b96b-347ece03513a";
const githubUserId = 666;

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: userId,
  },
  githubUserId,
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

vi.mock("src/hooks/useAuth/useRoles");

const mockContribution: UserPaymentRequestFragment = {
  __typename: "PaymentRequests",
  id: "705e6b37-d0ee-4e87-b681-7009dd691965",
  recipientId: 123,
  requestedAt: "2023-01-10T19:10:27.802657",
  payments: [
    {
      amount: 100,
      currencyCode: "USD",
    },
  ],
  amount: 200,
  workItems: [
    {
      __typename: "WorkItems",
      id: "705e6b37-d0ee-4e87-b681-7009dd691965",
      type: WorkItemType.Issue,
      githubIssue: null,
      githubPullRequest: null,
      githubCodeReview: null,
    },
  ],
  project: {
    id: "632d5da7-e590-4815-85ea-82a5585e6049",
    shortDescription: "SOOOOOO awesome",
    logoUrl: null,
    name: "MyAwesomeProject",
  },
  invoiceReceivedAt: null,
};

const buildMockPaymentsQuery = (
  githubUserId: number,
  paymentRequests: Record<string, unknown>[] = [mockContribution]
) => ({
  request: {
    query: GetPaymentRequestsDocument,
    variables: {
      githubUserId,
    },
  },
  result: {
    data: {
      paymentRequests,
    },
  },
});

describe('"Rewards" page', () => {
  beforeEach(() => {
    (useRoles as Mock).mockReturnValue({ githubUserId });
  });

  it("should not render when githubUserId is undefined", async () => {
    (useRoles as Mock).mockReturnValue({ githubUserId: undefined });

    const queryMock = {
      request: {
        query: GetPaymentRequestsDocument,
        variables: {
          githubUserId,
        },
      },
      newData: vi.fn(() => ({})),
    };

    renderWithIntl(<RewardsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [queryMock],
      }),
    });

    await waitFor(() => {
      expect(queryMock.newData).not.toHaveBeenCalled();
    });
  });

  it("should navigate to home when no contributions returned", async () => {
    renderWithIntl(<RewardsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [buildMockPaymentsQuery(githubUserId, [])],
      }),
    });

    expect(window.location.pathname).toEqual("/");
  });

  it("should render contributions table", async () => {
    renderWithIntl(<RewardsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [buildMockPaymentsQuery(githubUserId)],
      }),
    });

    expect(await screen.findByText("#705E6 · 1 contribution")).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.project?.name || "")).toBeInTheDocument();
    expect(await screen.findAllByText("$200")).toHaveLength(2);
    expect(await screen.findAllByText(/Payout info missing/i)).toHaveLength(1);
  });
});
