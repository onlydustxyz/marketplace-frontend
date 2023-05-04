import { chain, some } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import IssuesView from "./IssuesView";
import PullRequestsView from "./PullRequestsView";
import useIgnoredIssues from "./useIgnoredIssues";
import { LiveGithubIssueFragment, Type } from "src/__generated/graphql";

type Props = {
  type: Type;
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  unpaidIssues: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, workItems, onWorkItemAdded, unpaidIssues }: Props) {
  const { ignore: ignoreIssue, unignore: unignoreIssue } = useIgnoredIssues();

  const addAndUnignoreItem = (workItem: WorkItem) => {
    if (workItem.ignored) unignoreIssue(projectId, workItem);
    onWorkItemAdded(workItem);
  };

  const issues: WorkItem[] = useMemo(
    () => chain(unpaidIssues).differenceBy(workItems, "id").value(),
    [unpaidIssues, workItems]
  );

  return (
    <>
      {type === Type.PullRequest && (
        <PullRequestsView
          projectId={projectId}
          workItems={issues}
          onWorkItemAdded={addAndUnignoreItem}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
        />
      )}
      {type === Type.Issue && (
        <IssuesView
          projectId={projectId}
          workItems={issues}
          onWorkItemAdded={addAndUnignoreItem}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
        />
      )}
    </>
  );
}

export const issueToWorkItem = (
  { ignoredForProjects, ...props }: LiveGithubIssueFragment,
  projectId?: string
): WorkItem => ({
  ...props,
  ignored: some(ignoredForProjects, { projectId }),
});
