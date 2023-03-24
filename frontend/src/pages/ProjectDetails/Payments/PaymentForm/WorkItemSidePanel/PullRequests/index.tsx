import { gql } from "@apollo/client";
import { differenceBy, differenceWith, sortBy } from "lodash";
import { useMemo, useState } from "react";
import Callout from "src/components/Callout";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import QueryWrapper from "src/components/QueryWrapper";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Link from "src/icons/Link";
import { HasuraUserRole } from "src/types";
import { parsePullRequestLink } from "src/utils/github";
import isDefined from "src/utils/isDefined";
import {
  GetPaidWorkItemsQuery,
  IssueDetailsFragmentDoc,
  RepositoryOwnerAndNameFragment,
  SearchIssuesQuery,
} from "src/__generated/graphql";
import EmptyState from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Toggle";
import OtherPrInput from "./OtherInput";

type Props = {
  projectId: string;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export const buildQuery = (githubRepos: RepositoryOwnerAndNameFragment[], author: string) =>
  `${githubRepos.map(r => `repo:${r.owner}/${r.name}`).join(" ")} is:pr author:${author}`;

const MAX_PR_COUNT = 50;

export default function PullRequests({ projectId, contributorHandle, workItems, onWorkItemAdded }: Props) {
  const { T } = useIntl();

  const [addOtherPrEnabled, setAddOtherPrEnabled] = useState(false);
  const showToaster = useShowToaster();

  const onPullRequestAdded = (pr: WorkItem) => {
    onWorkItemAdded(pr);
    showToaster(T("payment.form.workItems.pullRequestedAddedToaster"));
  };

  const getPaidItemsQuery = useHasuraQuery<GetPaidWorkItemsQuery>(GET_PAID_WORK_ITEMS, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const searchPrQuery = useHasuraQuery<SearchIssuesQuery>(SEARCH_PULLREQUESTS, HasuraUserRole.RegisteredUser, {
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
        .slice(0, MAX_PR_COUNT),
    [pulls, paidItems]
  );

  return (
    <div className="flex flex-col gap-4 overflow-hidden -mr-4 h-full">
      <div className="flex flex-col gap-3 mr-4">
        <Toggle
          enabled={addOtherPrEnabled}
          setEnabled={setAddOtherPrEnabled}
          icon={<Link />}
          label={T("payment.form.workItems.addOtherPR.button")}
          testId="add-other-pr-toggle"
        />
        {addOtherPrEnabled && <OtherPrInput onWorkItemAdded={onPullRequestAdded} />}
      </div>
      <QueryWrapper
        query={{
          data: searchPrQuery.data && getPaidItemsQuery.data,
          loading: searchPrQuery.loading || getPaidItemsQuery.loading,
        }}
      >
        {elligiblePulls.length > 0 ? (
          <div
            data-testId="elligible-pulls"
            className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
          >
            {elligiblePulls.map(pr => (
              <GithubIssue key={pr.id} workItem={pr} action={Action.Add} onClick={() => onPullRequestAdded(pr)} />
            ))}
          </div>
        ) : (
          <div className="mr-4">
            <EmptyState />
          </div>
        )}
        {pulls.length > elligiblePulls.length && (
          <div className="mr-4">
            <Callout>{T("payment.form.workItems.morePullRequestsCallout", { count: MAX_PR_COUNT })}</Callout>
          </div>
        )}
      </QueryWrapper>
    </div>
  );
}

const SEARCH_PULLREQUESTS = gql`
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
