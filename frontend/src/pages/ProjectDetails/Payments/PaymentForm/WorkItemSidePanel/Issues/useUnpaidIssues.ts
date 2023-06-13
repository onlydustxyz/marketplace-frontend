import { chain, some } from "lodash";
import { useMemo } from "react";
import { GithubIssueFragment, Type, useGetPaidWorkItemsQuery, useSearchIssuesQuery } from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";

type Props = {
  projectId: string;
  authorId?: number;
  type: Type;
};

export default function useUnpaidIssues({ projectId, authorId, type }: Props) {
  const getPaidItemsQuery = useGetPaidWorkItemsQuery({
    variables: { projectId, githubUserId: authorId },
    skip: !authorId || !projectId,
  });

  const searchIssuesQuery = useSearchIssuesQuery({
    variables: {
      projectId,
      authorId,
      type: type === Type.Issue ? "issue" : "pull_request",
    },
    skip: !authorId || !projectId,
  });

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.paymentRequests.flatMap(p => p.workItems),
    [getPaidItemsQuery.data?.paymentRequests]
  );

  const eligibleIssues: WorkItem[] | undefined | null = useMemo(
    () =>
      searchIssuesQuery.data?.projectsByPk &&
      paidItems &&
      chain(searchIssuesQuery.data?.projectsByPk.githubRepos)
        .flatMap("repoIssues")
        .map(issue => issueToWorkItem(projectId, issue))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchIssuesQuery.data?.projectsByPk, paidItems, projectId]
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
