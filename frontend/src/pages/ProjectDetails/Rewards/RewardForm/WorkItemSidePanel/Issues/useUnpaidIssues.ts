import { chain, some } from "lodash";
import { useMemo } from "react";
import {
  GithubIssueFragment,
  GithubIssuesBoolExp,
  Type,
  useGetPaidWorkItemsQuery,
  useSearchIssuesQuery,
} from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";

type Props = {
  projectId: string;
  githubUserId?: number;
  type: Type;
};

function buildIssuesWhereClause(githubUserId: number, type: Type): GithubIssuesBoolExp {
  switch (type) {
    case Type.Issue:
      return { assigneeIds: { _contains: githubUserId }, type: { _eq: "issue" } } as GithubIssuesBoolExp;
    case Type.PullRequest:
      return { authorId: { _eq: githubUserId }, type: { _eq: "pull_request" } } as GithubIssuesBoolExp;
  }
}

export default function useUnpaidIssues({ projectId, githubUserId, type }: Props) {
  const getPaidItemsQuery = useGetPaidWorkItemsQuery({
    variables: { projectId, githubUserId },
    skip: !githubUserId || !projectId,
  });

  const searchIssuesQuery = useSearchIssuesQuery({
    variables: {
      projectId,
      issuesWhereClause: buildIssuesWhereClause(githubUserId || 0, type),
    },
    skip: !githubUserId || !projectId,
  });

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.paymentRequests.flatMap(p => p.workItems),
    [getPaidItemsQuery.data?.paymentRequests]
  );

  const eligibleIssues: WorkItem[] | undefined | null = useMemo(
    () =>
      searchIssuesQuery.data?.projects[0] &&
      paidItems &&
      chain(searchIssuesQuery.data?.projects[0].githubRepos)
        .flatMap("repoIssues")
        .map(issue => issueToWorkItem(projectId, issue))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchIssuesQuery.data?.projects[0], paidItems, projectId]
  );
  return {
    data: eligibleIssues,
    loading: searchIssuesQuery.loading || getPaidItemsQuery.loading,
  };
}

const issueToWorkItem = (
  projectId: string,
  { ignoredForProjects, issueNumber: number, status, type, ...props }: GithubIssueFragment
): WorkItem => ({
  ...props,
  number,
  type: type === "PullRequest" ? Type.PullRequest : Type.Issue,
  status: status.toUpperCase(),
  ignored: some(ignoredForProjects, { projectId }),
});
