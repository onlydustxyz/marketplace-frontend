import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentForm from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { FIND_USER_QUERY } from "src/hooks/useIsGithubLoginValid";
import { REQUEST_PAYMENT_MUTATION } from "src/hooks/usePaymentRequests";
import {
  FetchPullRequestDocument,
  FetchPullRequestQueryResult,
  FetchPullRequestQueryVariables,
  Status,
} from "src/__generated/graphql";
import { MockedResponse } from "@apollo/client/testing";

const TEST_USER = { id: "test-user-id", displayName: "test-user-name", githubUser: { githubUserId: 748483646584 } };

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
    query: FetchPullRequestDocument,
    variables: {
      repoOwner: "onlydustxyz",
      repoName: "marketplace",
      prNumber: 504,
    } as FetchPullRequestQueryVariables,
  },
  newData: vi.fn(() => ({
    data: {
      fetchPullRequest: {
        __typename: "PullRequest",
        id: 123456789,
        title: "A cool PR",
        status: Status.Merged,
        createdAt: Date.now(),
        mergedAt: Date.now(),
        closedAt: Date.now(),
        number: 504,
      },
    } as FetchPullRequestQueryResult["data"],
  })),
};

const graphQlMocks = [
  {
    request: {
      query: FIND_USER_QUERY,
      variables: {
        username: "test-user-name",
      },
    },
    newData: vi.fn(() => ({
      data: {
        fetchUserDetails: {
          id: TEST_USER.githubUser.githubUserId,
          login: TEST_USER.displayName,
          avatarUrl: "",
          user: null,
          __typename: "User",
        },
      },
    })),
  },
  {
    request: {
      query: REQUEST_PAYMENT_MUTATION,
      variables: {
        projectId: TEST_PROJECT_ID,
        amount: 1000,
        contributorId: TEST_USER.githubUser.githubUserId,
        reason: { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] },
      },
    },
    result: {
      data: {},
    },
  },
  fetchPrMock,
];

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

const RECIPIENT_INPUT_LABEL = /Please select the contributor you would like to send a payment to/i;
const ADD_WORK_ITEM_BUTTON_ID = "add-work-item-btn";
const ADD_OTHER_PR_TOGGLE_ID = "add-other-pr-toggle";
const ADD_OTHER_PR_BUTTON_ID = "add-other-pr-btn";
const CLOSE_ADD_WORK_ITEM_PANEL_BUTTON_ID = "close-add-work-item-panel-btn";

describe('"PaymentForm" component', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<PaymentForm />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: {
          projectId: TEST_PROJECT_ID,
          budget: { initialAmount: 10000, remainingAmount: 4000 },
        },
      }),
    });
  });

  it("should show the right input / button labels", async () => {
    expect(screen.queryByTestId(ADD_WORK_ITEM_BUTTON_ID)).not.toBeInTheDocument();
    await screen.findByText(RECIPIENT_INPUT_LABEL);
  });

  // TODO: fix test
  it.skip("should be able to request payment when required info is filled and go back to project overview", async () => {
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), TEST_USER.displayName);
    await waitFor(() => expect(graphQlMocks[0].newData).toHaveBeenCalledOnce());

    await userEvent.click(await screen.findByTestId(ADD_WORK_ITEM_BUTTON_ID));
    await userEvent.click(await screen.findByTestId(ADD_OTHER_PR_TOGGLE_ID));
    await userEvent.type(
      await screen.findByPlaceholderText(/github/i),
      "https://github.com/onlydustxyz/marketplace/pull/504"
    );

    await userEvent.click(await screen.findByTestId(ADD_OTHER_PR_BUTTON_ID));
    await waitFor(() => expect(fetchPrMock.newData).toHaveBeenCalledOnce());

    await userEvent.click(await screen.findByTestId(CLOSE_ADD_WORK_ITEM_PANEL_BUTTON_ID));
    await screen.findByText("A cool PR");

    await userEvent.click(await screen.findByText(/confirm payment/i));
    await screen.findByText("Payment successfully sent");
  });

  it("should display an error when the github username is invalid", async () => {
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), "invalid-username");
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/invalid github login/i);
      expect(errorMessages.length).toBe(1);
    });
  });

  it("should display an error when the reason is not a valid link to a github issue", async () => {
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), TEST_USER.displayName);
    await waitFor(() => {
      expect(graphQlMocks[0].newData).toHaveBeenCalledTimes(1);
    });
    await userEvent.click(await screen.findByTestId(ADD_WORK_ITEM_BUTTON_ID));
    await userEvent.click(await screen.findByTestId(ADD_OTHER_PR_TOGGLE_ID));
    await userEvent.type(await screen.findByPlaceholderText(/github/i), "not-a-link");
    const errorMessages = screen.getAllByText(/oops/i);
    expect(errorMessages.length).toBe(1);
  });
});
