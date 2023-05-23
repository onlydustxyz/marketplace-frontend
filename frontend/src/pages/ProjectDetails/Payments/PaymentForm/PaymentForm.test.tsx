import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentForm from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import {
  FetchIssueDocument,
  FetchIssueQueryResult,
  FetchIssueQueryVariables,
  GetPaidWorkItemsDocument,
  GetPaidWorkItemsQueryResult,
  GetPaidWorkItemsQueryVariables,
  SearchIssuesDocument,
  SearchIssuesQueryResult,
  SearchIssuesQueryVariables,
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQueryResult,
  Status,
  GithubUserWithPaymentRequestsForProjectFragment,
} from "src/__generated/graphql";
import { MockedResponse } from "@apollo/client/testing";
import { VirtuosoMockContext } from "react-virtuoso";

const TEST_USER = { id: "test-user-id", login: "test-login", githubUser: { githubUserId: 748483646584 } };
const TEST_GITHUB_USER: GithubUserWithPaymentRequestsForProjectFragment = {
  __typename: "GithubUsers",
  id: 23326,
  login: "test-login",
  avatarUrl: "test-avatar-url",
  user: { id: "test-user-id" },
  htmlUrl: "html-url",
  paymentRequests: [],
};

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

vi.mock("src/utils/date", () => ({
  daysFromNow: () => new Date(2022, 3, 10),
}));

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

const TEST_PROJECT_ID = "test-project-id";

const fetchPrMock: MockedResponse = {
  request: {
    query: FetchIssueDocument,
    variables: {
      repoOwner: "onlydustxyz",
      repoName: "marketplace",
      issueNumber: 504,
    } as FetchIssueQueryVariables,
  },
  newData: vi.fn(() => ({
    data: {
      fetchIssue: {
        __typename: "Issue",
        id: 123456789,
        title: "A cool PR",
        status: Status.Merged,
        createdAt: Date.now(),
        mergedAt: Date.now(),
        closedAt: Date.now(),
        number: 504,
      },
    } as FetchIssueQueryResult["data"],
  })),
};

const graphQlMocks = [
  fetchPrMock,
  {
    request: {
      query: GetProjectContributorsForPaymentSelectDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          __typename: "Projects",
          id: TEST_PROJECT_ID,
          contributors: [{ githubUser: TEST_GITHUB_USER }],
          githubRepos: [
            {
              githubRepoId: 123456,
              projectId: TEST_PROJECT_ID,
              repoIssues: [],
            },
          ],
          budgets: [],
        },
      } as GetProjectContributorsForPaymentSelectQueryResult["data"],
    },
  },
  {
    request: {
      query: GetPaidWorkItemsDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      } as GetPaidWorkItemsQueryVariables,
    },
    result: {
      data: {
        projectsByPk: {
          id: TEST_PROJECT_ID,
          githubRepos: [
            {
              projectId: TEST_PROJECT_ID,
              githubRepoId: 123456,
            },
          ],
          budgets: [],
        },
      } as GetPaidWorkItemsQueryResult["data"],
    },
  },
  {
    request: {
      query: SearchIssuesDocument,
      variables: {
        authorId: TEST_USER.id,
        projectId: TEST_PROJECT_ID,
      } as SearchIssuesQueryVariables,
    },
    result: {
      data: {
        projectsByPk: {
          __typename: "Projects",
          id: TEST_PROJECT_ID,
          githubRepos: [],
        },
      } as SearchIssuesQueryResult["data"],
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
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(
      <VirtuosoMockContext.Provider value={{ viewportHeight: 1000, itemHeight: 36 }}>
        <PaymentForm />
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
    await userEvent.click(await screen.findByText(TEST_USER.login));
    await userEvent.click(await screen.findByTestId(ADD_WORK_ITEM_BUTTON_ID));
    await userEvent.click(await screen.findByTestId(ADD_OTHER_PR_TOGGLE_ID));
    await userEvent.type(await screen.findByPlaceholderText(/github.com/i), "not-a-link");
    const errorMessages = screen.getAllByText(/oops/i);
    expect(errorMessages.length).toBe(1);
  });
});
