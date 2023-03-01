import { renderHook } from "@testing-library/react-hooks";
import { range } from "lodash";
import { ContributorsTableFieldsFragment, ProjectContributorsFragment } from "src/__generated/graphql";
import useProjectContributors from "./useProjectContributors";

const REPO1_ID = 123456;
const REPO2_ID = 321654;

const render = (project: ProjectContributorsFragment) => renderHook(() => useProjectContributors(project));

const [contributor1, contributor2, contributor3, contributor4, contributor5]: ContributorsTableFieldsFragment[] = range(
  5
).map(id => ({
  __typename: "User",
  id,
  login: "contributor" + id,
  avatarUrl: "logo" + id,
  user: null,
  paymentRequests: [],
}));

const project: ProjectContributorsFragment = {
  __typename: "Projects",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: REPO1_ID,
      githubRepoDetails: {
        id: REPO1_ID,
        content: { id: REPO1_ID, contributors: [contributor1, contributor2] },
      },
    },
    {
      __typename: "ProjectGithubRepos",
      githubRepoId: REPO2_ID,
      githubRepoDetails: {
        id: REPO2_ID,
        content: { id: REPO2_ID, contributors: [contributor2, contributor3] },
      },
    },
  ],
  budgets: [
    {
      id: "budget-1",
      paymentRequests: [
        { id: "p1", githubRecipient: contributor3 },
        { id: "p2", githubRecipient: contributor4 },
      ],
    },
    {
      id: "budget-2",
      paymentRequests: [
        { id: "p3", githubRecipient: contributor4 },
        { id: "p4", githubRecipient: contributor5 },
      ],
    },
  ],
};

describe("useProjectContributors", () => {
  test("should return deduplicated contributors", async () => {
    const { result } = render(project);
    expect(result.current.contributors).toHaveLength(5);
  });
});
