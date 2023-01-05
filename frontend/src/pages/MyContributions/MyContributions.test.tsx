import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import MyContributionsPage, { GET_MY_CONTRIBUTIONS_QUERY } from ".";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

expect.extend(matchers);

const userId = "33f15d41-5383-4a73-b96b-347ece03513a";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: userId,
  },
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
  userId: string,
  paymentRequests: Record<string, unknown>[] = [mockContribution]
) => ({
  request: {
    query: GET_MY_CONTRIBUTIONS_QUERY,
    variables: {
      userId: undefined,
    },
  },
  result: {
    data: {
      paymentRequests,
    },
  },
});

describe('"MyContributions" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  it("should print message when no contributions returned", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(userId, [])],
      }),
    });

    expect(await screen.findByText("No payments received yet")).toBeInTheDocument();
  });

  it("should render contributions table", async () => {
    renderWithIntl(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(userId)],
      }),
    });

    expect(await screen.findByText(mockContribution.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget.project.name)).toBeInTheDocument();
    expect(await screen.findByText("200 USD")).toBeInTheDocument();
    expect(await screen.findByText("Completed")).toBeInTheDocument();
  });
});
