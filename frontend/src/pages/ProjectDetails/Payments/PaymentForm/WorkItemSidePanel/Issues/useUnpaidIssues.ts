import { chain, some } from "lodash";
import { useMemo } from "react";
import {
  GetPaidWorkItemsDocument,
  GetPaidWorkItemsQuery,
  GithubIssueDetailsFragment,
  SearchIssuesDocument,
  SearchIssuesQuery,
} from "src/__generated/graphql";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { daysFromNow } from "src/utils/date";
import { SEARCH_MAX_DAYS_COUNT } from "src/pages/ProjectDetails/Payments/PaymentForm";
import { WorkItem } from "src/components/GithubIssue";

export enum IssueType {
  PullRequest = "PullRequest",
  Issue = "Issue",
}

export enum IssueState {
  Merged = "Merged",
}

type Props = {
  projectId: string;
  type: IssueType;
  authorId: number;
  state?: IssueState;
  includeIgnored?: boolean;
};

export default function useUnpaidIssues({ projectId, type, state, authorId, includeIgnored = false }: Props) {
  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(
    GetPaidWorkItemsDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const createdSince = useMemo(() => daysFromNow(SEARCH_MAX_DAYS_COUNT), [daysFromNow, SEARCH_MAX_DAYS_COUNT]);

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SearchIssuesDocument, HasuraUserRole.RegisteredUser, {
    variables: {
      projectId,
      authorId,
      status: state ? [state] : [],
      type,
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
        .map(issue => issueToWorkItem(projectId, issue))
        .differenceWith(paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        })
        .filter(item => includeIgnored || !item.ignored)
        .sortBy("createdAt")
        .reverse()
        .value(),
    [searchPrQuery.data?.projectsByPk, paidItems, projectId, includeIgnored]
  );
  return { data: elligibleIssues, loading: searchPrQuery.loading || getPaidItemsQuery.loading };
}

const issueToWorkItem = (
  projectId: string,
  { ignoredForProjects, issueNumber: number, status, ...props }: GithubIssueDetailsFragment
): WorkItem => ({
  ...props,
  number,
  status: status.toUpperCase(),
  ignored: some(ignoredForProjects, { projectId }),
});
