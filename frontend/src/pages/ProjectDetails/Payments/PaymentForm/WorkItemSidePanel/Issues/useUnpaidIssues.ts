import { differenceWith, sortBy } from "lodash";
import { useMemo } from "react";
import {
  GetPaidWorkItemsDocument,
  GetPaidWorkItemsQuery,
  RepositoryOwnerAndNameFragment,
  SearchIssuesDocument,
  SearchIssuesQuery,
} from "src/__generated/graphql";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { daysFromNow } from "src/utils/date";
import isDefined from "src/utils/isDefined";

export enum IssueType {
  PullRequest = "pr",
  Issue = "issue",
}

export enum IssueState {
  Merged = "merged",
}

export const buildQuery = ({
  author,
  repos = [],
  state,
  type,
}: { repos?: RepositoryOwnerAndNameFragment[] } & Filters) =>
  [`${repos?.map(r => `repo:${r.owner}/${r.name}`).join(" ")}`]
    .concat(type ? [`is:${type}`] : [])
    .concat(author ? [`author:${author}`] : [])
    .concat(state ? [`is:${state}`] : [])
    .concat([`created:>=${daysFromNow(60).toISOString().slice(0, 10)}`])
    .filter(a => a.length > 0)
    .join(" ");

type Filters = {
  type?: IssueType;
  author?: string;
  state?: IssueState;
};

type Props = {
  projectId: string;
  filters?: Filters;
};

export default function useUnpaidIssues({ projectId, filters }: Props) {
  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(
    GetPaidWorkItemsDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  console.log(
    buildQuery({
      ...filters,
      repos: getPaidItemsQuery.data?.projectsByPk?.githubRepos.map(r => r.githubRepoDetails?.content).filter(isDefined),
    })
  );

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SearchIssuesDocument, HasuraUserRole.RegisteredUser, {
    variables: {
      query: buildQuery({
        ...filters,
        repos: getPaidItemsQuery.data?.projectsByPk?.githubRepos
          .map(r => r.githubRepoDetails?.content)
          .filter(isDefined),
      }),
      order: "desc",
      sort: "created",
      perPage: 100,
    },
    skip: !getPaidItemsQuery.data?.projectsByPk?.githubRepos || !filters?.author,
  });

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.projectsByPk?.budgets.flatMap(b => b.paymentRequests).flatMap(p => p.workItems),
    [getPaidItemsQuery.data?.projectsByPk?.budgets]
  );

  const elligibleIssues = useMemo(
    () =>
      searchPrQuery.data?.searchIssues &&
      paidItems &&
      sortBy(
        differenceWith(searchPrQuery.data?.searchIssues, paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        }),
        "createdAt"
      ).reverse(),
    [searchPrQuery.data?.searchIssues, paidItems]
  );

  return { data: elligibleIssues, loading: searchPrQuery.loading || getPaidItemsQuery.loading };
}
