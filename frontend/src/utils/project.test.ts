import { range } from "lodash";
import {
  GithubUserIdFragment,
  GithubIssueFragment,
  Status,
  Type,
  WorkItemIdFragment,
  ProjectContributorsWithPaymentSummaryFragment,
  GithubUserWithPaymentRequestsForProjectFragment,
} from "src/__generated/graphql";
import { countUnpaidMergedPullsByContributor, getContributors } from "./project";

const REPO1_ID = 123456;
const REPO2_ID = 321654;

const [
  contributor1,
  contributor2,
  contributor3,
  contributor4,
  contributor5,
]: GithubUserWithPaymentRequestsForProjectFragment[] = range(5).map(id => ({
  __typename: "GithubUsers",
  id,
  login: "contributor" + id,
  htmlUrl: "htmlUrl" + id,
  avatarUrl: "logo" + id,
  user: null,
  paymentRequests: [],
}));

const project: ProjectContributorsWithPaymentSummaryFragment = {
  __typename: "Projects",
  id: "12345",
  githubRepos: [
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-1",
      githubRepoId: REPO1_ID,
      repoContributors: [{ user: contributor1 }, { user: contributor2 }],
    },
    {
      __typename: "ProjectGithubRepos",
      projectId: "project-1",
      githubRepoId: REPO2_ID,
      repoContributors: [{ user: contributor2 }, { user: contributor3 }],
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
    const { contributors } = getContributors(project);
    expect(contributors).toHaveLength(5);
  });
});

describe("countUnpaidMergedPullsByContributor", () => {
  it("should count unpaid merged PRs by author login", () => {
    const users: GithubUserIdFragment[] = range(0, 3).map(id => ({
      id: 1000 + id,
    }));

    const paidItems: WorkItemIdFragment[] = range(0, 3).map(id => ({
      repoId: 1000 + id,
      issueNumber: id + 1,
      paymentId: 1000 + id,
    }));

    const mergedPaidPulls: GithubIssueFragment[] = paidItems.map(({ repoId, issueNumber }, index) => ({
      id: 2000 + index,
      repoId,
      issueNumber,
      closedAt: new Date(),
      createdAt: new Date(),
      mergedAt: new Date(),
      htmlUrl: "",
      title: "title",
      type: Type.PullRequest,
      authorId: users[index].id,
      status: Status.Merged,
      ignoredForProjects: [],
    }));

    const mergedUnPaidPulls: GithubIssueFragment[] = range(0, 10).map(id => ({
      id: 3000 + id,
      repoId: 3000 + id,
      issueNumber: id,
      closedAt: new Date(),
      createdAt: new Date(),
      mergedAt: new Date(),
      htmlUrl: "",
      title: "title",
      type: Type.PullRequest,
      authorId: users[id % users.length].id,
      status: Status.Merged,
      ignoredForProjects: [],
    }));

    const counts = countUnpaidMergedPullsByContributor({
      id: "12345",
      githubRepos: [
        {
          repoContributors: users.map(user => ({ user })),
          repoIssues: [...mergedPaidPulls, ...mergedUnPaidPulls],
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
      [users[0].id]: 4,
      [users[1].id]: 3,
      [users[2].id]: 3,
    });
  });
});
