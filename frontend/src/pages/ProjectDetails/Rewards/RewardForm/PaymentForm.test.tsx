import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import RewardForm from ".";
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
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidUnignoredCount: 0 } } },
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
        paymentRequests: [],
        budgetsAggregate: { aggregate: null },
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
        projectsContributors: [{ user: TEST_CONTRIBUTOR }],
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

const RECIPIENT_INPUT_LABEL = /Search by Github handle/i;

describe('"RewardForm" component', () => {
  beforeEach(() => {
    renderWithIntl(
      <VirtuosoMockContext.Provider value={{ viewportHeight: 1000, itemHeight: 36 }}>
        <ContributorProfilePanelProvider>
          <RewardForm />
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
});
