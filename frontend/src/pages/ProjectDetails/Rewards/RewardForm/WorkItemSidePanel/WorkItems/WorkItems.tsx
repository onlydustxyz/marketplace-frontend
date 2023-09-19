import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  GithubCodeReviewFragment,
  GithubIssueFragment,
  GithubPullRequestWithCommitsFragment,
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

export function WorkItems({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
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
      type,
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

export const contributionToWorkItem = ({
  githubIssue,
  githubPullRequest,
  githubCodeReview,
}: ContributionFragment): WorkItemFragment | null => {
  switch (true) {
    case !!githubIssue:
      return githubIssue && issueToWorkItem(githubIssue);
    case !!githubPullRequest:
      return githubPullRequest && pullRequestToWorkItem(githubPullRequest);
    case !!githubCodeReview:
      return githubCodeReview && codeReviewToWorkItem(githubCodeReview);
    default:
      return null;
  }
};

export const issueToWorkItem = (issue: GithubIssueFragment): WorkItemFragment => ({
  type: WorkItemType.Issue,
  id: issue.id.toString(),
  githubIssue: issue,
  githubPullRequest: null,
  githubCodeReview: null,
});

export const pullRequestToWorkItem = (pullRequest: GithubPullRequestWithCommitsFragment): WorkItemFragment => ({
  type: WorkItemType.PullRequest,
  id: pullRequest.id.toString(),
  githubIssue: null,
  githubPullRequest: pullRequest,
  githubCodeReview: null,
});

export const codeReviewToWorkItem = (codeReview: GithubCodeReviewFragment): WorkItemFragment => ({
  type: WorkItemType.CodeReview,
  id: codeReview.id,
  githubIssue: null,
  githubPullRequest: null,
  githubCodeReview: codeReview,
});
