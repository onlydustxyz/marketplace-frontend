import { chain, some } from "lodash";
import { WorkItem } from "src/components/GithubIssue";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import {
  GithubIssueFragment,
  GithubPullRequestFragment,
  LiveGithubIssueCreatedAndClosedFragment,
  LiveGithubIssueFragment,
  LiveGithubPullRequestFragment,
  WorkItemType,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import { useMemo } from "react";
import { GithubIssueType } from "src/types";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, onWorkItemAdded }: Props) {
  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions();

  const addAndUnignoreItem = (workItem: WorkItem) => {
    if (workItem.ignored) unignoreContribution(projectId, workItem);
    onWorkItemAdded(workItem);
  };

  const { data } = useUnrewardedContributionsQuery({
    variables: {
      projectId,
      githubUserId: contributorId,
      type,
    },
  });

  const issues = useMemo(
    () => chain(unpaidIssues?.contributions).differenceBy(workItems, "id").value(),
    [unpaidIssues, workItems]
  );

  return (
    <View
      projectId={projectId}
      contributions={data?.contributions}
      type={type}
      onWorkItemAdded={addAndUnignoreItem}
      onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
      onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
    />
  );
}

export const issueToWorkItem = (props: LiveGithubIssueFragment): WorkItem => ({
  ...props,
  type: WorkItemType.Issue,
  // ignored: some(ignoredForProjects, { projectId }),
  ignored: false,
});

export const issueCreatedAndClosedToWorkItem = (
  issueCreatedAndClosedFragment: LiveGithubIssueCreatedAndClosedFragment
): WorkItem => ({
  ...issueCreatedAndClosedFragment,
  type: WorkItemType.Issue,
  ignored: false,
});

export const pullRequestToWorkItem = (props: LiveGithubPullRequestFragment): WorkItem => ({
  ...props,
  type: WorkItemType.PullRequest,
  // ignored: some(ignoredForProjects, { projectId }),
  ignored: false,
});
