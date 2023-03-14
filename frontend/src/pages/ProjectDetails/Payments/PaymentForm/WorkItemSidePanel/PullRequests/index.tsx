import { gql } from "@apollo/client";
import { differenceBy, differenceWith } from "lodash";
import { useMemo, useState } from "react";
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
  PullRequestDetailsFragmentDoc,
  RepositoryDetailsForGithubIssueFragmentDoc,
  SearchPullRequestsQuery,
} from "src/__generated/graphql";
import EmptyState from "../EmptyState";
import Toggle from "../Toggle";
import OtherPrInput from "./OtherInput";

type Props = {
  projectId: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function PullRequests({ projectId, workItems, onWorkItemAdded }: Props) {
  const { T } = useIntl();

  const [addOtherPrEnabled, setAddOtherPrEnabled] = useState(false);
  const showToaster = useShowToaster();

  const onPullRequestAdded = (pr: WorkItem) => {
    onWorkItemAdded(pr);
    showToaster(T("payment.form.workItems.pullRequestedAddedToaster"));
  };

  const searchPrQuery = useHasuraQuery<SearchPullRequestsQuery>(SEARCH_PULLREQUESTS, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const pulls: WorkItem[] = useMemo(
    () =>
      searchPrQuery.data?.projectsByPk?.githubRepos
        .map(repo => repo.githubRepoDetails)
        .filter(isDefined)
        .flatMap(repository => repository.pullRequests?.map(issue => ({ issue, repository: repository })) || []) || [],
    [searchPrQuery.data?.projectsByPk?.githubRepos]
  );

  const paidItems = useMemo(
    () =>
      searchPrQuery.data?.projectsByPk?.budgets
        .flatMap(b => b.paymentRequests)
        .flatMap(p => p.reason.work_items)
        .map(parsePullRequestLink) || [],
    [searchPrQuery.data?.projectsByPk?.budgets]
  );

  const elligiblePulls = useMemo(
    () =>
      differenceWith(
        differenceBy(pulls, workItems, "issue.id"),
        paidItems,
        (pr, paidItem) =>
          pr.repository.owner === paidItem.repoOwner &&
          pr.repository.name === paidItem.repoName &&
          pr.issue.number === paidItem.prNumber
      ),
    [pulls, paidItems, workItems]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Toggle
          enabled={addOtherPrEnabled}
          setEnabled={setAddOtherPrEnabled}
          icon={<Link />}
          label={T("payment.form.workItems.addOtherPR.button")}
          testId="add-other-pr-toggle"
        />
        {addOtherPrEnabled && <OtherPrInput onWorkItemAdded={onPullRequestAdded} />}
      </div>
      <QueryWrapper query={searchPrQuery}>
        {elligiblePulls.length > 0 ? (
          <div>
            {elligiblePulls.map(pr => (
              <GithubIssue key={pr.issue.id} {...pr} action={Action.Add} onClick={() => onPullRequestAdded(pr)} />
            ))}{" "}
          </div>
        ) : (
          <EmptyState />
        )}
      </QueryWrapper>
    </div>
  );
}

const SEARCH_PULLREQUESTS = gql`
  ${PullRequestDetailsFragmentDoc}
  ${RepositoryDetailsForGithubIssueFragmentDoc}
  fragment PaymentRequestReason on PaymentRequests {
    id
    reason
  }

  query searchPullRequests($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      budgets {
        id
        paymentRequests {
          ...PaymentRequestReason
        }
      }
      githubRepos {
        githubRepoDetails {
          ...RepositoryDetailsForGithubIssue
          pullRequests {
            ...PullRequestDetails
          }
        }
      }
    }
  }
`;
