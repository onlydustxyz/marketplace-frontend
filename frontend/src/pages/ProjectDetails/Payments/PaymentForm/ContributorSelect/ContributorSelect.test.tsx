import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import ContributorSelect, { countUnpaidMergedPullsByContributor } from ".";
import {
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQueryResult,
  GithubContributorFragment,
  PullDetailsFragment,
  WorkItem,
} from "src/__generated/graphql";
import { range } from "lodash";

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
                pullRequests: [],
              },
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

describe.only("countUnpaidMergedPullsByContributor", () => {
  it("should count unpaid merged PRs by author login", () => {
    const users: GithubContributorFragment[] = range(0, 3).map(id => ({
      id: 1000 + id,
      login: `user-${id + 1}`,
      user: null,
      avatarUrl: "",
    }));

    const paidItems: WorkItem[] = range(0, 3).map(id => ({
      repoId: 1000 + id,
      issueNumber: id + 1,
    }));

    const mergedPaidPulls: PullDetailsFragment[] = paidItems.map(({ repoId, issueNumber }, index) => ({
      id: 2000 + index,
      repoId,
      number: issueNumber,
      author: users[index],
      mergedAt: new Date(),
    }));

    const mergedUnPaidPulls: PullDetailsFragment[] = range(0, 10).map(id => ({
      id: 3000 + id,
      repoId: 3000 + id,
      number: id,
      author: users[id % users.length],
      mergedAt: new Date(),
    }));

    const openPulls: PullDetailsFragment[] = range(0, 4).map(id => ({
      id: 4000 + id,
      repoId: 4000 + id,
      number: id,
      author: users[id % users.length],
      mergedAt: null, // TODO change to status
    }));

    const counts = countUnpaidMergedPullsByContributor({
      id: "project-1",
      githubRepos: [
        {
          githubRepoDetails: {
            id: 123456,
            pullRequests: [...mergedPaidPulls, ...mergedUnPaidPulls, ...openPulls],
            content: { id: 123456, contributors: [...users] },
          },
        },
      ],
      budgets: [
        {
          paymentRequests: paidItems.map((workItem, index) => ({
            id: `payment-${index + 1}`,
            workItems: [workItem],
            githubRecipient: users[index % users.length],
          })),
        },
      ],
    });

    expect(counts).to.deep.equal({
      [users[0].login]: 4,
      [users[1].login]: 3,
      [users[2].login]: 3,
    });
  });
});
