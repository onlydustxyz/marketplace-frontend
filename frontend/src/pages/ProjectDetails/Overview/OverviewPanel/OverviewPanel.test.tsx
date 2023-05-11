import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import OverviewPanel from ".";
import {
  GetProjectContributorsForOverviewDocument,
  GetProjectContributorsForOverviewQueryResult,
} from "src/__generated/graphql";

expect.extend(matchers);

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: "test-user-id",
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_BASIC_TEST_VALUE }),
  },
}));

const TEST_PROJECT_ID = "test-project-id";

const graphQlMocks = [
  {
    request: {
      query: GetProjectContributorsForOverviewDocument,
      variables: {
        projectId: TEST_PROJECT_ID,
      },
    },
    result: {
      data: {
        projectsByPk: {
          githubRepos: [
            {
              repoContributors: [{ user: { login: "test-login", avatarUrl: "test-url" } }],
            },
            {
              repoContributors: [{ user: { login: "test-login", avatarUrl: "test-url" } }],
            },
          ],
        },
      } as GetProjectContributorsForOverviewQueryResult["data"],
    },
  },
];

describe("Overview component", () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<OverviewPanel sponsors={[]} telegramLink="test-telegram-link" projectId={TEST_PROJECT_ID} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { projectId: TEST_PROJECT_ID },
      }),
    });
  });

  it("should render the contributors element of the panel", async () => {
    await screen.findByText(/contributor/i);
  });

  it("should deduplicate users", async () => {
    await screen.findByText(/1/i);
  });
});
