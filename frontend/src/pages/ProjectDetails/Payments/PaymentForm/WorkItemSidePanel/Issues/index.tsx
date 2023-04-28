import { chain, filter, find } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import IssuesView from "./IssuesView";
import PullRequestsView from "./PullRequestsView";
import useUnpaidIssues, { IssueType } from "./useUnpaidIssues";
import useIgnoredIssues from "./useIgnoredIssues";

type Props = {
  type: IssueType;
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, onWorkItemAdded }: Props) {
  const { data: unpaidIssues } = useUnpaidIssues({
    projectId,
    authorId: contributorId,
    type,
    includeIgnored: true,
  });

  const initialIgnoredIssues = useMemo(() => filter(unpaidIssues || [], "ignored"), [projectId, unpaidIssues]);

  const {
    issues: ignoredIssues,
    ignore: ignoreIssue,
    unignore: unignoreIssue,
  } = useIgnoredIssues(initialIgnoredIssues);

  const addAndUnignoreItem = (workItem: WorkItem) => {
    if (find(ignoredIssues, { id: workItem.id })) unignoreIssue(projectId, workItem);
    onWorkItemAdded(workItem);
  };

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
          onWorkItemAdded={addAndUnignoreItem}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
        />
      )}
      {type === IssueType.Issue && (
        <IssuesView
          workItems={issues}
          ignoredItems={ignoredIssues}
          onWorkItemAdded={addAndUnignoreItem}
          onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
          onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
        />
      )}
    </>
  );
}
