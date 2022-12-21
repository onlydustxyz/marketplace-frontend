import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { GET_USERS_QUERY, REQUEST_PAYMENT_MUTATION } from ".";
import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentForm from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

const TEST_USER = { id: "test-user-id", displayName: "test-user-name", githubUser: { githubUserId: 748483646584 } };
const TEST_BUDGET_ID = "test-budget-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER.id,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

expect.extend(matchers);

vi.mock("jwt-decode", () => ({
  default: () => ({ [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: '{"test-project-id"}' } }),
}));

const graphQlMocks = [
  {
    request: {
      query: GET_USERS_QUERY,
    },
    result: {
      data: {
        users: [TEST_USER],
      },
    },
  },
  {
    request: {
      query: REQUEST_PAYMENT_MUTATION,
      variables: { budgetId: "test-budget-id", amount: 3, contributorId: TEST_USER.githubUser.githubUserId },
    },
    result: {
      data: {},
    },
  },
];

describe('"PaymentForm" component', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<PaymentForm budget={{ initialAmount: 100, remainingAmount: 40, id: TEST_BUDGET_ID }} />, {
      wrapper: MemoryRouterProviderFactory({
        route: `${RoutePaths.ProjectDetails}/test-project-id`,
        mocks: graphQlMocks,
      }),
    });
  });

  it("should show the right input / button labels", async () => {
    await screen.findByText(/submit payment/i);
    await screen.findByText(/link to issue/i);
    await screen.findByText(/contributor/i);
    await screen.findByText(/memo/i);
    await screen.findByText(/seniority/i);
    await screen.findByText(/working days/i);
    await screen.findByText(/overall satisfaction/i);
    await screen.findByText(/amount to wire/i);
  });

  it("should be able to see user name in dropdown", async () => {
    await userEvent.click(await screen.findByRole("combobox", { name: /contributor/i }));
    await screen.findByText(/test-user-name/i);
  });

  it("should display an error when a required field is missing", async () => {
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>(/link to issue/i));
    await waitFor(() => {
      expect(screen.getByLabelText<HTMLInputElement>(/link to issue/i).value).toBe("");
    });
    await userEvent.click(await screen.findByRole("button", { name: /send/i }));
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/required/i);
      expect(errorMessages.length).toBe(2);
    });
  });

  it("should be able to request payment when required info is filled", async () => {
    await userEvent.type(await screen.findByLabelText(/link to issue/i), "test-link-name");
    userEvent.selectOptions(
      await screen.findByRole("combobox", { name: /contributor/i }),
      TEST_USER.githubUser.githubUserId.toString()
    );
    await userEvent.type(await screen.findByRole("spinbutton", { name: /amount to wire/i }), "3");
    await userEvent.click(await screen.findByText(/send/i));
    await waitFor(() => {
      const successMessage = screen.getByText(/sent/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
