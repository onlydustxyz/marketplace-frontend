import { gql } from "@apollo/client";
import { differenceBy, differenceWith, sortBy } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import isDefined from "src/utils/isDefined";
import {
  GetPaidWorkItemsQuery,
  IssueDetailsFragmentDoc,
  RepositoryOwnerAndNameFragment,
  SearchIssuesQuery,
} from "src/__generated/graphql";
import IssuesView from "./IssuesView";
import PullRequestsView from "./PullRequestsView";

export enum IssueType {
  PullRequest = "pr",
  Issue = "issue",
}

type Props = {
  type: IssueType;
  projectId: string;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export const buildQuery = (githubRepos: RepositoryOwnerAndNameFragment[], author: string, issueType: IssueType) =>
  `${githubRepos.map(r => `repo:${r.owner}/${r.name}`).join(" ")} is:${issueType} author:${author}`;

export const MAX_ISSUE_COUNT = 50;

export default function Issues({ type, projectId, contributorHandle, workItems, onWorkItemAdded }: Props) {
  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(GET_PAID_WORK_ITEMS, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SEARCH_ISSUES, HasuraUserRole.RegisteredUser, {
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

  const issues: WorkItem[] = useMemo(
    () => differenceBy(searchPrQuery.data?.searchIssues || [], workItems, "id"),
    [searchPrQuery.data?.searchIssues, workItems]
  );

  const paidItems = useMemo(
    () => getPaidItemsQuery.data?.projectsByPk?.budgets.flatMap(b => b.paymentRequests).flatMap(p => p.workItems) || [],

    [getPaidItemsQuery.data?.projectsByPk?.budgets]
  );

  const elligibleIssues = useMemo(
    () =>
      sortBy(
        differenceWith(issues, paidItems, (pr, paidItem) => {
          return pr.repoId === paidItem.repoId && pr.number === paidItem.issueNumber;
        }),
        "createdAt"
      )
        .reverse()
        .slice(0, MAX_ISSUE_COUNT),
    [issues, paidItems]
  );

  return (
    <>
      {type === IssueType.PullRequest && (
        <PullRequestsView
          workItems={elligibleIssues}
          onWorkItemAdded={onWorkItemAdded}
          query={{
            data: searchPrQuery.data && getPaidItemsQuery.data,
            loading: searchPrQuery.loading || getPaidItemsQuery.loading,
          }}
          isMore={issues.length > elligibleIssues.length}
        />
      )}
      {type === IssueType.Issue && (
        <IssuesView
          workItems={elligibleIssues}
          onWorkItemAdded={onWorkItemAdded}
          query={{
            data: searchPrQuery.data && getPaidItemsQuery.data,
            loading: searchPrQuery.loading || getPaidItemsQuery.loading,
          }}
          isMore={issues.length > elligibleIssues.length}
        />
      )}
    </>
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
  fragment RepositoryOwnerAndName on Repository {
    owner
    name
  }

  query getPaidWorkItems($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      githubRepos {
        githubRepoDetails {
          id
          content {
            ...RepositoryOwnerAndName
          }
        }
      }
      budgets {
        id
        paymentRequests {
          id
          workItems {
            repoId
            issueNumber
          }
        }
      }
    }
  }
`;
