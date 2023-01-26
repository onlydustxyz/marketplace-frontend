import { describe, expect, it, Mock, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import MyContributionsPage, { GET_MY_CONTRIBUTIONS_QUERY, GET_PAYOUT_SETTINGS_QUERY } from ".";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { useRoles } from "src/hooks/useAuth/useRoles";

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

const mockContribution = {
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
  budget: {
    project: {
      id: "632d5da7-e590-4815-85ea-82a5585e6049",
      name: "MyAwesomeProject",
      projectDetails: {
        description: "SOOOOOO awesome",
        logoUrl: null,
      },
      githubRepo: null,
    },
  },
};

const buildMockMyContributionsQuery = (
  githubUserId: number,
  paymentRequests: Record<string, unknown>[] = [mockContribution]
) => ({
  request: {
    query: GET_MY_CONTRIBUTIONS_QUERY,
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

const buidlMockPayoutSettingsQuery = (payoutSettings: any) => ({
  request: {
    query: GET_PAYOUT_SETTINGS_QUERY,
  },
  result: {
    data: {
      userInfo: [
        {
          payoutSettings,
        },
      ],
    },
  },
});

describe('"MyContributions" page', () => {
  beforeEach(() => {
    (useRoles as Mock).mockReturnValue({ githubUserId });
  });

  it("should not render when githubUserId is undefined", async () => {
    (useRoles as Mock).mockReturnValue({ githubUserId: undefined });

    const queryMock = {
      request: {
        query: GET_MY_CONTRIBUTIONS_QUERY,
        variables: {
          githubUserId,
        },
      },
      newData: vi.fn(() => ({})),
    };

    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [queryMock],
      }),
    });

    await waitFor(() => {
      expect(queryMock.newData).not.toHaveBeenCalled();
    });
  });

  it("should navigate to home when no contributions returned", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(githubUserId, [])],
      }),
    });

    expect(window.location.pathname).toEqual("/");
  });

  it("should render contributions table", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(githubUserId)],
      }),
    });

    expect(await screen.findByText(mockContribution.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget.project.name)).toBeInTheDocument();
    expect(await screen.findByText("200 USD")).toBeInTheDocument();
    expect(await screen.findByText(/complete/i)).toBeInTheDocument();
  });

  it("should display banner when there are payments but no payout info", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(githubUserId), buidlMockPayoutSettingsQuery(undefined)],
      }),
    });
    expect(await screen.findByText("Complete payout information")).toBeInTheDocument();
  });

  it("should not display banner when there are payments and payout info", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [
          buildMockMyContributionsQuery(githubUserId),
          buidlMockPayoutSettingsQuery({ EthTransfer: { Name: "vitalik.eth" } }),
        ],
      }),
    });

    expect(await screen.findByText(mockContribution.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget.project.name)).toBeInTheDocument();
    expect(await screen.findByText("200 USD")).toBeInTheDocument();
    expect(await screen.findByText(/complete/i)).toBeInTheDocument();
    expect(screen.queryByText("Complete payment information")).not.toBeInTheDocument();
  });
});
