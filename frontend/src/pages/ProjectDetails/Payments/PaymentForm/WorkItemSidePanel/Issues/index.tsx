import { chain, find } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import IssuesView from "./IssuesView";
import PullRequestsView from "./PullRequestsView";
import useUnpaidIssues, { IssueType } from "./useUnpaidIssues";
import useIgnoredIssues from "./useIgnoredIssues";

type Props = {
  type: IssueType;
  projectId: string;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorHandle, workItems, onWorkItemAdded }: Props) {
  const { data: unpaidIssues, loading } = useUnpaidIssues({
    projectId,
    filters: { author: contributorHandle, type },
    includeIgnored: true,
  });

  const initialIgnoredIssues = useMemo(
    () => unpaidIssues?.filter((issue: WorkItem) => find(issue.ignoredForProjects, { projectId })) || [],
    [projectId, unpaidIssues]
  );

  const {
    issues: ignoredIssues,
    ignore: ignoreIssue,
    unignore: unignoreIssue,
  } = useIgnoredIssues(initialIgnoredIssues);

  const issues: WorkItem[] = useMemo(
    () => chain(unpaidIssues).differenceBy(workItems, "id").differenceBy(ignoredIssues, "id").value(),
    [unpaidIssues, workItems, ignoredIssues]
  );

  return (
    <>
      {type === IssueType.PullRequest && (
        <PullRequestsView
          workItems={issues}
          ignoredItems={ignoredIssues}
          onWorkItemAdded={onWorkItemAdded}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
          query={{
            data: unpaidIssues,
            loading,
          }}
        />
      )}
      {type === IssueType.Issue && (
        <IssuesView
          workItems={issues}
          ignoredItems={ignoredIssues}
          onWorkItemAdded={onWorkItemAdded}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
          query={{
            data: unpaidIssues,
            loading,
          }}
        />
      )}
    </>
  );
}
