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
import isDefined from "src/utils/isDefined";

export enum IssueType {
  PullRequest = "pr",
  Issue = "issue",
}

export const buildQuery = (githubRepos: RepositoryOwnerAndNameFragment[], author: string, issueType: IssueType) =>
  `${githubRepos.map(r => `repo:${r.owner}/${r.name}`).join(" ")} is:${issueType} author:${author}`;

type Props = {
  projectId: string;
  contributorHandle: string;
  type: IssueType;
};

export default function useUnpaidIssues({ projectId, contributorHandle, type }: Props) {
  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(
    GetPaidWorkItemsDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
    }
  );

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SearchIssuesDocument, HasuraUserRole.RegisteredUser, {
    variables: {
      query: buildQuery(
        getPaidItemsQuery.data?.projectsByPk?.githubRepos.map(r => r.githubRepoDetails?.content).filter(isDefined) ||
          [],
        contributorHandle,
        type
      ),
      order: "desc",
      sort: "created",
      perPage: 100,
    },
    skip: !getPaidItemsQuery.data?.projectsByPk?.githubRepos,
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
