import { chain, some } from "lodash";
import { useMemo } from "react";
import { GithubIssueFragment, Type, useGetPaidWorkItemsQuery, useSearchIssuesQuery } from "src/__generated/graphql";
import { daysFromNow } from "src/utils/date";
import { SEARCH_MAX_DAYS_COUNT } from "src/pages/ProjectDetails/Payments/PaymentForm";
import { WorkItem } from "src/components/GithubIssue";

type Props = {
  projectId: string;
  authorId: number;
};

export default function useUnpaidIssues({ projectId, authorId }: Props) {
  const getPaidItemsQuery = useGetPaidWorkItemsQuery({
    variables: { projectId },
  });

  const createdSince = useMemo(() => daysFromNow(SEARCH_MAX_DAYS_COUNT), [daysFromNow, SEARCH_MAX_DAYS_COUNT]);

  const searchPrQuery = useSearchIssuesQuery({
    variables: {
      projectId,
      authorId,
      createdSince,
    },
    skip: !authorId || !projectId,
  });

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.projectsByPk?.budgets.flatMap(b => b.paymentRequests).flatMap(p => p.workItems),
    [getPaidItemsQuery.data?.projectsByPk?.budgets]
  );

  const elligibleIssues: WorkItem[] | undefined | null = useMemo(
    () =>
      searchPrQuery.data?.projectsByPk &&
      paidItems &&
      chain(searchPrQuery.data?.projectsByPk.githubRepos)
        .flatMap("repoIssues")
        .map(issue => issueToWorkItem(issue, projectId))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchPrQuery.data?.projectsByPk, paidItems, projectId]
  );
  return { data: elligibleIssues, loading: searchPrQuery.loading || getPaidItemsQuery.loading };
}

export const issueToWorkItem = (
  { ignoredForProjects, issueNumber: number, status, type, ...props }: GithubIssueFragment,
  projectId?: string
): WorkItem => ({
  ...props,
  number,
  type: type === "PullRequest" ? Type.PullRequest : Type.Issue,
  status: status.toUpperCase(),
  ignored: some(ignoredForProjects, { projectId }),
});
