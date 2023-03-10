import { describe, expect, it, Mock, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import PaymentsPage, { GET_PAYMENTS_QUERY } from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { UserPaymentRequestFragment } from "src/__generated/graphql";

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
  requestedAt: "2023-01-10T19:10:27.802657",
  payments: [
    {
      amount: 100,
      currencyCode: "USD",
    },
  ],
  amountInUsd: 200,
  reason: { work_items: ["link_to_pr"] },
  budget: {
    id: "budget-1",
    project: {
      id: "632d5da7-e590-4815-85ea-82a5585e6049",
      projectDetails: {
        projectId: "632d5da7-e590-4815-85ea-82a5585e6049",
        shortDescription: "SOOOOOO awesome",
        logoUrl: null,
        name: "MyAwesomeProject",
      },
    },
  },
};

const buildMockPaymentsQuery = (
  githubUserId: number,
  paymentRequests: Record<string, unknown>[] = [mockContribution]
) => ({
  request: {
    query: GET_PAYMENTS_QUERY,
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

describe('"Payments" page', () => {
  beforeEach(() => {
    (useRoles as Mock).mockReturnValue({ githubUserId });
  });

  it("should not render when githubUserId is undefined", async () => {
    (useRoles as Mock).mockReturnValue({ githubUserId: undefined });

    const queryMock = {
      request: {
        query: GET_PAYMENTS_QUERY,
        variables: {
          githubUserId,
        },
      },
      newData: vi.fn(() => ({})),
    };

    renderWithIntl(<PaymentsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [queryMock],
      }),
    });

    await waitFor(() => {
      expect(queryMock.newData).not.toHaveBeenCalled();
    });
  });

  it("should navigate to home when no contributions returned", async () => {
    renderWithIntl(<PaymentsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [buildMockPaymentsQuery(githubUserId, [])],
      }),
    });

    expect(window.location.pathname).toEqual("/");
  });

  it("should render contributions table", async () => {
    renderWithIntl(<PaymentsPage />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: [buildMockPaymentsQuery(githubUserId)],
      }),
    });

    expect(await screen.findByText(mockContribution.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget?.project?.projectDetails?.name || "")).toBeInTheDocument();
    expect(await screen.findAllByText("$200")).toHaveLength(2);
    expect(await screen.findAllByText(/Payout info missing/i)).toHaveLength(1);
  });
});
