import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentActions, { GET_BUDGET_PAYMENTS_QUERY } from ".";
import { RoutePaths } from "src/App";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

expect.extend(matchers);

const TEST_BUDGET_ID = "test-budget-id";
const TEST_USER_ID = "test-user-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

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
      },
    },
  },
};

const graphQlMocks = [
  {
    request: {
      query: GET_BUDGET_PAYMENTS_QUERY,
      variables: {
        budgetId: TEST_BUDGET_ID,
      },
    },
    result: {
      data: {
        paymentRequests: [mockContribution],
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

describe('"ProjectDetails" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(
      <PaymentActions
        project={{ id: "test-project-id", budget: { initialAmount: 100, remainingAmount: 40, id: TEST_BUDGET_ID } }}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          route: `${RoutePaths.ProjectDetails}/test-project-id`,
          mocks: graphQlMocks,
        }),
      }
    );
  });

  it("should render the submit payment buttons", async () => {
    await screen.findByText(/submit payment/i);
  });

  it("should render the remaining budget", async () => {
    await screen.findByText(/remaining budget/i);
  });

  it("should render the payments table", async () => {
    expect(await screen.findByText(mockContribution.reason.work_items[0])).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget.project.name)).toBeInTheDocument();
    expect(await screen.findByText("200 USD")).toBeInTheDocument();
    expect(await screen.findByText("Completed")).toBeInTheDocument();
  });

  it("should render the list payments button after clicking the toggle button", async () => {
    await userEvent.click(await screen.findByText(/submit payment/i));
    await waitFor(() => {
      screen.getByText(/list payments/i);
    });
  });
});
