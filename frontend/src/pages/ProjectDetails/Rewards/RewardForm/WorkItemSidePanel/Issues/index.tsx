import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  GithubIssueCreatedAndClosedStatus,
  GithubIssueFragment,
  GithubIssueStatus,
  GithubPullRequestFragment,
  LiveGithubIssueCreatedAndClosedFragment,
  LiveGithubIssueFragment,
  LiveGithubPullRequestFragment,
  WorkItemType,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import { GithubIssue as GithubIssueType } from "src/components/GithubIssue";
import { GithubPullRequest as GithubPullRequestType } from "src/components/GithubPullRequest";
import { WorkItem } from "src/pages/ProjectDetails/Rewards/RewardForm";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  addWorkItem: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions();

  const addAndUnignoreContribution = (contribution: ContributionFragment) => {
    const workItem = contributionToWorkItem(contribution);
    if (workItem?.ignored && contribution.id) unignoreContribution(projectId, contribution.id);
    workItem && addWorkItem(workItem);
  };

  const { data } = useUnrewardedContributionsQuery({
    variables: {
      projectId,
      githubUserId: contributorId,
      type: type.toLowerCase(),
    },
  });

  const contributionsNotAdded = useMemo(
    () =>
      chain(data?.contributions)
        .differenceWith(workItems, (contribution, workItem) => contribution.detailsId === workItem.id)
        .value(),
    [data?.contributions, workItems]
  );

  return (
    <View
      projectId={projectId}
      contributions={contributionsNotAdded}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      ignoreContribution={(contribution: ContributionFragment) =>
        contribution.id && ignoreContribution(projectId, contribution.id)
      }
      unignoreContribution={(contribution: ContributionFragment) =>
        contribution.id && unignoreContribution(projectId, contribution.id)
      }
    />
  );
}

export const contributionToWorkItem = (contribution: ContributionFragment): WorkItem | undefined => {
  const workItem = contribution.githubIssue
    ? issueToWorkItem(contribution.githubIssue)
    : contribution.githubPullRequest
    ? pullRequestToWorkItem(contribution.githubPullRequest)
    : undefined;

  if (workItem) workItem.ignored = contribution.ignored || false;
  return workItem;
};

export const issueToWorkItem = (props: GithubIssueFragment | LiveGithubIssueFragment): GithubIssueType => ({
  ...props,
  type: WorkItemType.Issue,
  ignored: false,
  id: props.id.toString(),
});

export const issueCreatedAndClosedToWorkItem = (
  issueCreatedAndClosedFragment: LiveGithubIssueCreatedAndClosedFragment
): WorkItem => ({
  ...issueCreatedAndClosedFragment,
  type: WorkItemType.Issue,
  ignored: false,
  id: issueCreatedAndClosedFragment.id.toString(),
  mergedAt: undefined,
  status: githubIssueCreatedAndClosedStatusToGithubIssueStatus(issueCreatedAndClosedFragment.status),
});

const githubIssueCreatedAndClosedStatusToGithubIssueStatus = (
  status: GithubIssueCreatedAndClosedStatus
): GithubIssueStatus => {
  switch (status) {
    case GithubIssueCreatedAndClosedStatus.Open:
      return GithubIssueStatus.Open;
    case GithubIssueCreatedAndClosedStatus.Completed:
      return GithubIssueStatus.Completed;
    case GithubIssueCreatedAndClosedStatus.Cancelled:
      return GithubIssueStatus.Cancelled;
  }
};

export const pullRequestToWorkItem = (
  props: GithubPullRequestFragment | LiveGithubPullRequestFragment
): GithubPullRequestType => ({
  ...props,
  type: WorkItemType.PullRequest,
  ignored: false,
  id: props.id.toString(),
});
