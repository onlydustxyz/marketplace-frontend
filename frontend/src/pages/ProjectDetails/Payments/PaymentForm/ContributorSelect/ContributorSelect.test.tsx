import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VirtuosoMockContext } from "react-virtuoso";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import ContributorSelect from ".";
import {
  ContributorFragment,
  GetProjectContributorsDocument,
  GetProjectContributorsQueryResult,
} from "src/__generated/graphql";
import { Contributor } from "src/pages/ProjectDetails/Payments/PaymentForm/types";

const TEST_USER: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 123456,
  login: "test-user-name",
  avatarUrl: "test-avatar-url",
  userId: "test-user-id",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidUnignoredCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};

const TEST_OTHER_USER: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 654321,
  login: "test-other-user-name",
  avatarUrl: "test-avatar-url",
  userId: "test-other-user-id",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidUnignoredCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};

const TEST_PROJECT_ID = "test-project-id";

const graphQlMocks = [
  {
    request: {
      query: GetProjectContributorsDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsContributors: [TEST_USER, TEST_OTHER_USER].map(user => ({ user })),
      } as GetProjectContributorsQueryResult["data"],
    },
  },
];

const RECIPIENT_INPUT_LABEL = /Search by Github handle/i;

describe('"ContributorSelect" component', () => {
  let contributor: Contributor | null | undefined = null;

  beforeEach(() => {
    contributor = null;
    renderWithIntl(
      <VirtuosoMockContext.Provider value={{ viewportHeight: 1000, itemHeight: 36 }}>
        <ContributorSelect
          projectId={TEST_PROJECT_ID}
          contributor={contributor}
          setContributor={newContributor => {
            contributor = newContributor;
          }}
        />
      </VirtuosoMockContext.Provider>,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );
  });

  it("should display internal contributors when clicking input", async () => {
    await userEvent.click(await screen.findByText(RECIPIENT_INPUT_LABEL));
    await screen.findByText(TEST_USER.login || "");
  });

  it("should be able to choose a contributor in the list by clicking", async () => {
    await userEvent.click(await screen.findByText(RECIPIENT_INPUT_LABEL));
    await userEvent.click(await screen.findByText(TEST_OTHER_USER.login || ""));
    expect(contributor?.login).toEqual(TEST_OTHER_USER.login);
  });
});
