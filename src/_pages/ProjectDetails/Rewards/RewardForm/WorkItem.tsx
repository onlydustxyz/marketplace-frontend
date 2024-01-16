import { ComponentType } from "react";
import GithubCodeReview from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import GithubIssue, { Action as GithubIssueAction } from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { Contributor } from "./types";
import { RewardableWorkItem } from "./WorkItemSidePanel/WorkItems/WorkItems";
import { WorkItemType } from "src/types";

function getContribution(workItem: RewardableWorkItem) {
  let contribution:
    | RewardableWorkItem["githubIssue"]
    | RewardableWorkItem["githubPullRequest"]
    | RewardableWorkItem["githubCodeReview"];

  switch (workItem.type) {
    case WorkItemType.Issue:
      contribution = workItem?.githubIssue;
      break;
    case WorkItemType.PullRequest:
      contribution = workItem?.githubPullRequest;
      break;
    case WorkItemType.CodeReview:
      contribution = workItem?.githubCodeReview;
      break;
  }

  return {
    // TODO get author info
    githubAuthor: {
      avatarUrl: "",
      githubUserId: 0,
      htmlUrl: contribution?.htmlUrl,
      login: "",
    },
    githubBody: "", // TODO get this from the API
    githubHtmlUrl: contribution?.htmlUrl,
    githubNumber: contribution?.number,
    githubStatus: contribution?.status,
    githubTitle: contribution?.title,
    type: contribution?.type,
  };
}

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
      contribution={getContribution(workItem)}
      {...githubProp[workItem.type as WorkItemType]}
    />
  );
}
