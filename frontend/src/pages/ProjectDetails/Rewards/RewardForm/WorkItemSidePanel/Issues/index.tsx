import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  GithubIssueFragment,
  GithubPullRequestFragment,
  WorkItemFragment,
  WorkItemType,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItemFragment[];
  addWorkItem: (workItem: WorkItemFragment) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions();

  const addAndUnignoreContribution = (contribution: ContributionFragment) => {
    if (contribution.ignored && contribution.id) unignoreContribution(projectId, contribution.id);
    const workItem = contributionToWorkItem(contribution);
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

export const contributionToWorkItem = (contribution: ContributionFragment): WorkItemFragment | undefined => {
  return contribution.githubIssue
    ? issueToWorkItem(contribution.githubIssue)
    : contribution.githubPullRequest
    ? pullRequestToWorkItem(contribution.githubPullRequest)
    : undefined;
};

export const issueToWorkItem = (issue: GithubIssueFragment): WorkItemFragment => ({
  type: WorkItemType.Issue,
  id: issue.id.toString(),
  githubIssue: issue,
  githubPullRequest: null,
});

export const pullRequestToWorkItem = (pullRequest: GithubPullRequestFragment): WorkItemFragment => ({
  type: WorkItemType.PullRequest,
  id: pullRequest.id.toString(),
  githubIssue: null,
  githubPullRequest: pullRequest,
});
