import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import OverviewPanel, { GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_PANEL_QUERY } from ".";

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
      query: GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_PANEL_QUERY,
      variables: {
        projectId: TEST_PROJECT_ID,
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
    renderWithIntl(<OverviewPanel sponsors={[]} telegramLink="test-telegram-link" projectId={TEST_PROJECT_ID} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
        context: { projectId: TEST_PROJECT_ID },
      }),
    });
  });

  it("should render the contributors element of the panel", async () => {
    await screen.findByText(/contributors/i);
    await screen.findByText(/1/i);
  });
});
