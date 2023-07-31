import { chain, some } from "lodash";
import { useMemo } from "react";
import {
  GithubIssueFragment,
  GithubPullRequestFragment,
  useGetPaidWorkItemsQuery,
  useSearchIssuesQuery,
  useSearchPullRequestsQuery,
} from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import { GithubIssueType } from "src/types";

type Props = {
  projectId: string;
  githubUserId?: number;
  type: GithubIssueType;
};

export default function useUnpaidIssues({ projectId, githubUserId, type }: Props) {
  const getPaidItemsQuery = useGetPaidWorkItemsQuery({
    variables: { projectId, githubUserId },
    skip: !githubUserId || !projectId,
  });

  const searchIssuesQuery = useSearchIssuesQuery({
    variables: {
      projectId,
      githubUserId,
    },
    skip: !githubUserId || !projectId || type !== GithubIssueType.Issue,
  });

  const searchPullRequestsQuery = useSearchPullRequestsQuery({
    variables: {
      projectId,
      githubUserId,
    },
    skip: !githubUserId || !projectId || type !== GithubIssueType.PullRequest,
  });

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.paymentRequests.flatMap(p => p.workItems),
    [getPaidItemsQuery.data?.paymentRequests]
  );

  const eligibleIssues: WorkItem[] | undefined | null = useMemo(
    () =>
      searchIssuesQuery.data?.githubIssues &&
      paidItems &&
      chain(searchIssuesQuery.data?.githubIssues)
        .map(issue => issueToWorkItem(projectId, type, issue))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchIssuesQuery.data?.githubIssues, paidItems, projectId]
  );

  const eligiblePullRequests: WorkItem[] | undefined | null = useMemo(
    () =>
      searchPullRequestsQuery.data?.githubPullRequests &&
      paidItems &&
      chain(searchPullRequestsQuery.data?.githubPullRequests)
        .map(pullRequest => issueToWorkItem(projectId, type, pullRequest))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchPullRequestsQuery.data?.githubPullRequests, paidItems, projectId]
  );

  return {
    data: eligibleIssues ?? eligiblePullRequests,
    loading: searchIssuesQuery.loading || getPaidItemsQuery.loading,
  };
}

const issueToWorkItem = (
  projectId: string,
  type: GithubIssueType,
  { ignoredForProjects, number, status, ...props }: GithubIssueFragment | GithubPullRequestFragment
): WorkItem => ({
  ...props,
  number,
  type,
  status: status.toUpperCase(),
  ignored: some(ignoredForProjects, { projectId }),
});
