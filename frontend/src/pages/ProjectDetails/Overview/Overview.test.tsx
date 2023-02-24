import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import Overview, { GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_QUERY } from ".";

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

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_QUERY,
      variables: {
        projectId: "test-project-id",
      },
    },
    result: {
      data: {
        projectsByPk: {
          githubRepos: [
            {
              githubRepoDetails: {
                content: {
                  contributors: [{ login: "test-login", avatarUrl: "test-url" }],
                },
              },
            },
          ],
        },
      },
    },
  },
];

describe("Overview component", () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<Overview />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { projectId: "test-project-id" },
      }),
    });
  });

  it("should render the contributors element of the panel", async () => {
    await screen.findByText(/contributors/i);
    await screen.findByText(/1/i);
  });
});
