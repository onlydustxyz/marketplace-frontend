import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { REGEX_VALID_GITHUB_PULL_REQUEST_URL } from ".";
import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import PaymentForm from ".";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { FIND_USER_QUERY } from "src/hooks/useIsGithubLoginValid";
import { REQUEST_PAYMENT_MUTATION } from "src/hooks/usePaymentRequests";

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
        projectId: "test-project-id",
        amount: 1000,
        contributorId: TEST_USER.githubUser.githubUserId,
        reason: { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] },
      },
    },
    result: {
      data: {},
    },
  },
];

const RECIPIENT_INPUT_LABEL = /Please select the contributor you would like to send a payment to/i;
const PR_LINK_INPUT_LABEL = /Please add a link to the corresponding pull request on Github/i;

describe('"PaymentForm" component', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(
      <PaymentForm projectId={"test-project-id"} budget={{ initialAmount: 10000, remainingAmount: 4000 }} />,
      {
        wrapper: MemoryRouterProviderFactory({
          route: `${RoutePaths.ProjectDetails}/test-project-id`,
          mocks: graphQlMocks,
        }),
      }
    );
  });

  it("should show the right input / button labels", async () => {
    await screen.findByText(PR_LINK_INPUT_LABEL);
    await screen.findByText(RECIPIENT_INPUT_LABEL);
  });

  it("should be able to request payment when required info is filled and go back to project overview", async () => {
    await userEvent.type(
      await screen.findByLabelText(PR_LINK_INPUT_LABEL),
      "https://github.com/onlydustxyz/marketplace/pull/504"
    );
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), TEST_USER.displayName);
    await waitFor(() => {
      expect(graphQlMocks[0].newData).toHaveBeenCalledTimes(1);
    });
    await userEvent.click(await screen.findByText(/confirm payment/i));
    await waitFor(() => {
      expect(screen.getByLabelText(RECIPIENT_INPUT_LABEL)).toHaveValue("");
      expect(screen.getByLabelText(PR_LINK_INPUT_LABEL)).toHaveValue("");
    });
  });

  it("should display an error when the github username is invalid", async () => {
    await userEvent.type(
      await screen.findByLabelText(PR_LINK_INPUT_LABEL),
      "https://github.com/onlydustxyz/marketplace/pull/504"
    );
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), "invalid-username");
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/invalid github login/i);
      expect(errorMessages.length).toBe(1);
    });
  });

  it("should display an error when the reason is not a valid link to a github issue", async () => {
    await userEvent.type(await screen.findByLabelText(PR_LINK_INPUT_LABEL), "not-a-link");
    await userEvent.type(await screen.findByLabelText(RECIPIENT_INPUT_LABEL), TEST_USER.displayName);
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/oops/i);
      expect(errorMessages.length).toBe(1);
    });
  });
});

describe.each([
  { link: "https://github.com/onlydustxyz/marketplace/pull/504", shouldMatch: true },
  { link: "https://github.com/only-dust.xyz123/42_market---p.l.a.c.e/pull/66666", shouldMatch: true },
  { link: "https://github.com/ONLY-dust/F00/pull/66666", shouldMatch: true },
  { link: "https://github.com/onlydust/xyz/marketplace/pull/504", shouldMatch: false },
  { link: "https://github.co/onlydustxyz/marketplace/pull/504", shouldMatch: false },
  { link: "https://github.com/onlydustxyz/marketplace/issues/504", shouldMatch: false },
  { link: "https://github.com/onlydustxyz/pull/504", shouldMatch: false },
  { link: "https://github.com/onlydustxyz/marketplace/pull/", shouldMatch: false },
  {
    link: "https://github.com/onlydustxyz/marketplace/pull/504, https://github.com/onlydustxyz/marketplace/pull/505",
    shouldMatch: false,
  },
  { link: "not-a-link", shouldMatch: false },
])("Github PR validation regexp", ({ link, shouldMatch }) => {
  test(`should ${shouldMatch ? "" : "not "}match link '${link}'`, async () => {
    expect(REGEX_VALID_GITHUB_PULL_REQUEST_URL.test(link)).toEqual(shouldMatch);
  });
});
