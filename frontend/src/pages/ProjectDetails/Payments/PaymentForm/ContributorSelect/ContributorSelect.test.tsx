import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import ContributorSelect, { GET_PROJECT_CONTRIBUTORS_QUERY, SEARCH_GITHUB_USERS_BY_HANDLE_SUBSTRING_QUERY } from ".";
import { GithubContributorFragment } from "src/__generated/graphql";

const TEST_USER = {
  id: "test-user-id",
  login: "test-user-name",
  avatarUrl: "test-avatar-url",
  user: { userId: "test-user-id" },
};

const TEST_OTHER_USER = {
  id: "test-other-user-id",
  login: "test-other-user-name",
  avatarUrl: "test-avatar-url",
  user: { userId: "test-other-user-id" },
};

const TEST_EXTERNAL_USER = {
  id: "test-external-user-id",
  login: "test-external-user-name",
  avatarUrl: "test-avatar-url",
  user: { userId: "test-external-user-id" },
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

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

const TEST_PROJECT_ID = "test-project-id";
const graphQlMocks = [
  {
    request: {
      query: SEARCH_GITHUB_USERS_BY_HANDLE_SUBSTRING_QUERY,
      variables: {
        handleSubstringQuery: `type:user ${TEST_USER.login.slice(0, 3)} in:login`,
      },
    },
    result: {
      data: {
        searchUsers: [TEST_EXTERNAL_USER],
      },
    },
  },
  {
    request: {
      query: GET_PROJECT_CONTRIBUTORS_QUERY,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          id: TEST_PROJECT_ID,
          githubRepos: [
            {
              githubRepoDetails: {
                content: {
                  id: "test-id",
                  contributors: [TEST_USER, TEST_OTHER_USER],
                },
              },
            },
          ],
        },
      },
    },
  },
];

const RECIPIENT_INPUT_LABEL = /Search by Github handle/i;

describe('"PaymentForm" component', () => {
  let contributor: GithubContributorFragment | null | undefined = null;

  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    contributor = null;
    renderWithIntl(
      <ContributorSelect
        projectId={TEST_PROJECT_ID}
        contributor={null}
        setContributor={(newContributor: GithubContributorFragment | null | undefined) => {
          contributor = newContributor;
        }}
      />,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocks,
        }),
      }
    );
  });

  it("should display internal contributors when clicking input", async () => {
    await userEvent.click(await screen.findByPlaceholderText(RECIPIENT_INPUT_LABEL));
    await screen.findByText(TEST_USER.login);
  });

  it("should choose the first contributor in the list when pressign the enter key", async () => {
    await userEvent.click(await screen.findByPlaceholderText(RECIPIENT_INPUT_LABEL));
    await userEvent.keyboard("{Enter}");
    expect(contributor?.login).toEqual(TEST_OTHER_USER.login);
  });

  it("should choose the first contributor in the list when pressing the enter key", async () => {
    await userEvent.click(await screen.findByPlaceholderText(RECIPIENT_INPUT_LABEL));
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(contributor?.login).toEqual(TEST_USER.login);
  });

  it("shouldn't display external contributors below 3 characters typed", async () => {
    await userEvent.type(await screen.findByPlaceholderText(RECIPIENT_INPUT_LABEL), TEST_USER.login.slice(0, 2));
    await screen.findByText(TEST_USER.login);
    expect(screen.queryByText("EXTERNAL_USERS")).toBeNull();
    expect(screen.queryByText(TEST_EXTERNAL_USER.login)).toBeNull();
  });

  it("should display external contributors below 3 characters typed", async () => {
    await userEvent.type(await screen.findByPlaceholderText(RECIPIENT_INPUT_LABEL), TEST_USER.login.slice(0, 3));
    await screen.findByText(TEST_USER.login);
    await screen.findByText("EXTERNAL USERS");
    await screen.findByText(TEST_EXTERNAL_USER.login);
  });
});
