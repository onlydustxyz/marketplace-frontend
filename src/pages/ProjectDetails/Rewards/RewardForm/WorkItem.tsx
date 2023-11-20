import { ComponentType } from "react";
import { WorkItemType } from "src/__generated/graphql";
import GithubCodeReview from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import GithubIssue, { Action as GithubIssueAction } from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { Contributor } from "./types";
import { RewardableWorkItem } from "./WorkItemSidePanel/WorkItems/WorkItems";

export function WorkItem({
  workItem,
  contributor,
  action,
}: {
  workItem: RewardableWorkItem;
  contributor: Contributor;
  action: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components: Record<WorkItemType, ComponentType<any>> = {
    [WorkItemType.Issue]: GithubIssue,
    [WorkItemType.PullRequest]: GithubPullRequest,
    [WorkItemType.CodeReview]: GithubCodeReview,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const githubProp: Record<WorkItemType, Record<string, any>> = {
    [WorkItemType.Issue]: { issue: workItem.githubIssue },
    [WorkItemType.PullRequest]: { pullRequest: workItem.githubPullRequest },
    [WorkItemType.CodeReview]: { codeReview: workItem.githubCodeReview },
  };

  const Component = components[workItem.type as WorkItemType];

  return (
    <Component
      key={workItem.id}
      action={GithubIssueAction.Remove}
      onClick={action}
      contributor={contributor}
      {...githubProp[workItem.type as WorkItemType]}
    />
  );
}
