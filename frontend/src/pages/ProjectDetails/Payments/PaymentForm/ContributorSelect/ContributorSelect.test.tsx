import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import ContributorSelect from ".";
import {
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQueryResult,
  GithubContributorFragment,
} from "src/__generated/graphql";
import { daysFromNow } from "src/utils/date";

vi.mock("src/utils/date", () => ({
  daysFromNow: () => new Date(2022, 3, 10),
}));

const TEST_USER: GithubContributorFragment = {
  __typename: "User",
  id: 123456,
  login: "test-user-name",
  avatarUrl: "test-avatar-url",
  user: { userId: "test-user-id" },
};

const TEST_OTHER_USER: GithubContributorFragment = {
  __typename: "User",
  id: 654321,
  login: "test-other-user-name",
  avatarUrl: "test-avatar-url",
  user: { userId: "test-other-user-id" },
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
      query: GetProjectContributorsForPaymentSelectDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
        createdSince: daysFromNow(60),
      },
    },
    result: {
      data: {
        projectsByPk: {
          __typename: "Projects",
          id: TEST_PROJECT_ID,
          githubRepos: [
            {
              githubRepoDetails: {
                id: 123456,
                content: {
                  id: 123456,
                  contributors: [TEST_USER, TEST_OTHER_USER],
                },
              },
              repoPulls: [],
            },
          ],
          budgets: [],
        },
      } as GetProjectContributorsForPaymentSelectQueryResult["data"],
    },
  },
];

const RECIPIENT_INPUT_LABEL = /Search by Github handle/i;

describe('"ContributorSelect" component', () => {
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
    await userEvent.click(await screen.findByText(RECIPIENT_INPUT_LABEL));
    await screen.findByText(TEST_USER.login);
  });

  it("should be able to choose a contributor in the list by clicking", async () => {
    await userEvent.click(await screen.findByText(RECIPIENT_INPUT_LABEL));
    await userEvent.click(await screen.findByText(TEST_OTHER_USER.login));
    expect(contributor?.login).toEqual(TEST_OTHER_USER.login);
  });
});
