import { gql } from "@apollo/client";
import { differenceBy, differenceWith, sortBy } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { parsePullRequestLink } from "src/utils/github";
import isDefined from "src/utils/isDefined";
import {
  GetPaidWorkItemsQuery,
  IssueDetailsFragmentDoc,
  RepositoryOwnerAndNameFragment,
  SearchIssuesQuery,
} from "src/__generated/graphql";
import PullRequestsView from "./PullRequestsView";

type Props = {
  projectId: string;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export const buildQuery = (githubRepos: RepositoryOwnerAndNameFragment[], author: string) =>
  `${githubRepos.map(r => `repo:${r.owner}/${r.name}`).join(" ")} is:pr author:${author}`;

export const MAX_ISSUE_COUNT = 50;

export default function Issues({ projectId, contributorHandle, workItems, onWorkItemAdded }: Props) {
  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(GET_PAID_WORK_ITEMS, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SEARCH_ISSUES, HasuraUserRole.RegisteredUser, {
    variables: {
      query: buildQuery(
        getPaidItemsQuery.data?.projectsByPk?.githubRepos.map(r => r.githubRepoDetails).filter(isDefined) || [],
        contributorHandle
      ),
      order: "desc",
      sort: "created",
      perPage: 100,
    },
    skip: !getPaidItemsQuery.data?.projectsByPk?.githubRepos,
  });

  const pulls: WorkItem[] = useMemo(
    () => differenceBy(searchPrQuery.data?.searchIssues || [], workItems, "id"),
    [searchPrQuery.data?.searchIssues, workItems]
  );

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.projectsByPk?.budgets.flatMap(b => b.paymentRequests).flatMap(p => p.workItems) || [],

    [getPaidItemsQuery.data?.projectsByPk?.budgets]
  );

  const elligiblePulls = useMemo(
    () =>
      sortBy(
        differenceWith(pulls, paidItems, (pr, paidItem) => {
          const { repoOwner, repoName } = parsePullRequestLink(pr.htmlUrl);
          return (
            repoOwner === paidItem.repoOwner && repoName === paidItem.repoName && pr.number === paidItem.issueNumber
          );
        }),
        "createdAt"
      )
        .reverse()
        .slice(0, MAX_ISSUE_COUNT),
    [pulls, paidItems]
  );

  return (
    <PullRequestsView
      workItems={elligiblePulls}
      onWorkItemAdded={onWorkItemAdded}
      query={{
        data: searchPrQuery.data && getPaidItemsQuery.data,
        loading: searchPrQuery.loading || getPaidItemsQuery.loading,
      }}
      isMore={pulls.length > elligiblePulls.length}
    />
  );
}

const SEARCH_ISSUES = gql`
  ${IssueDetailsFragmentDoc}
  query searchIssues($query: String!, $order: String, $sort: String, $perPage: Int) {
    searchIssues(query: $query, order: $order, sort: $sort, perPage: $perPage) {
      ...IssueDetails
    }
  }
`;

const GET_PAID_WORK_ITEMS = gql`
  fragment RepositoryOwnerAndName on GithubRepoDetails {
    owner
    name
  }

  query getPaidWorkItems($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      githubRepos {
        githubRepoDetails {
          ...RepositoryOwnerAndName
        }
      }
      budgets {
        id
        paymentRequests {
          id
          workItems {
            repoOwner
            repoName
            issueNumber
          }
        }
      }
    }
  }
`;
