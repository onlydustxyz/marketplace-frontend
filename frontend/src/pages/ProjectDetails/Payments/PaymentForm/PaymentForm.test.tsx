import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentForm from ".";
import {
  ContributorFragment,
  GetPaymentRequestsForProjectDocument,
  GetPaymentRequestsForProjectQueryResult,
  GetProjectContributorsDocument,
  GetProjectContributorsQueryResult,
} from "src/__generated/graphql";
import { VirtuosoMockContext } from "react-virtuoso";
import { ContributorProfilePanelProvider } from "src/hooks/useContributorProfilePanel";

const TEST_CONTRIBUTOR: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 23326,
  login: "test-login",
  avatarUrl: "test-avatar-url",
  userId: "test-user-id",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};

expect.extend(matchers);

const TEST_PROJECT_ID = "test-project-id";

const graphQlMocks = [
  {
    request: {
      query: GetPaymentRequestsForProjectDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: null,
      } as GetPaymentRequestsForProjectQueryResult["data"],
    },
  },
  {
    request: {
      query: GetProjectContributorsDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsContributorsView: [{ user: TEST_CONTRIBUTOR }],
      } as GetProjectContributorsQueryResult["data"],
    },
  },
];

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

const ADD_WORK_ITEM_BUTTON_ID = "add-work-item-btn";
const ADD_OTHER_PR_TOGGLE_ID = "add-other-pullRequests-toggle";

const RECIPIENT_INPUT_LABEL = /Search by Github handle/i;

describe('"PaymentForm" component', () => {
  beforeEach(() => {
    renderWithIntl(
      <VirtuosoMockContext.Provider value={{ viewportHeight: 1000, itemHeight: 36 }}>
        <ContributorProfilePanelProvider>
          <PaymentForm />
        </ContributorProfilePanelProvider>
      </VirtuosoMockContext.Provider>,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
          context: {
            projectId: TEST_PROJECT_ID,
            budget: { initialAmount: 10000, remainingAmount: 4000 },
          },
        }),
      }
    );
  });

  it("should show the right input / button labels", async () => {
    expect(screen.queryByTestId(ADD_WORK_ITEM_BUTTON_ID)).not.toBeInTheDocument();
    await screen.findByText(RECIPIENT_INPUT_LABEL);
  });

  it("should display an error when the reason is not a valid link to a github issue", async () => {
    await userEvent.click(await screen.findByText(RECIPIENT_INPUT_LABEL));
    await userEvent.click(await screen.findByText(TEST_CONTRIBUTOR.login || ""));
    await userEvent.click(await screen.findByTestId(ADD_WORK_ITEM_BUTTON_ID));
    await userEvent.click(await screen.findByTestId(ADD_OTHER_PR_TOGGLE_ID));
    await userEvent.type(await screen.findByPlaceholderText(/github.com/i), "not-a-link");
    const errorMessages = screen.getAllByText(/oops/i);
    expect(errorMessages.length).toBe(1);
  });
});
