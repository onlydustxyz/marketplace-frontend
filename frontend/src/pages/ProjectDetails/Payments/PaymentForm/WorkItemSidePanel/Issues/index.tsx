import { some } from "lodash";
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
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, onWorkItemAdded }: Props) {
  const { ignore: ignoreIssue, unignore: unignoreIssue } = useIgnoredIssues();

  const addAndUnignoreItem = (workItem: WorkItem) => {
    if (workItem.ignored) unignoreIssue(projectId, workItem);
    onWorkItemAdded(workItem);
  };

  return (
    <>
      {type === Type.PullRequest && (
        <PullRequestsView
          projectId={projectId}
          contributorId={contributorId}
          workItems={workItems}
          onWorkItemAdded={addAndUnignoreItem}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
        />
      )}
      {type === Type.Issue && (
        <IssuesView
          projectId={projectId}
          contributorId={contributorId}
          workItems={workItems}
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
