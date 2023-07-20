import { chain, some } from "lodash";
import { WorkItem } from "src/components/GithubIssue";
import View from "./View";
import useIgnoredIssues from "./useIgnoredIssues";
import { LiveGithubIssueFragment, Type } from "src/__generated/graphql";
import useUnpaidIssues from "./useUnpaidIssues";
import { useMemo } from "react";

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

  const { data: unpaidIssues } = useUnpaidIssues({
    projectId,
    githubUserId: contributorId,
    type,
  });

  const issues: WorkItem[] = useMemo(
    () => chain(unpaidIssues).differenceBy(workItems, "id").value(),
    [unpaidIssues, workItems]
  );

  return (
    <View
      projectId={projectId}
      issues={issues}
      type={type}
      onWorkItemAdded={addAndUnignoreItem}
      onWorkItemIgnored={workItem => ignoreIssue(projectId, workItem)}
      onWorkItemUnignored={workItem => unignoreIssue(projectId, workItem)}
    />
  );
}

export const issueToWorkItem = (
  { ignoredForProjects, ...props }: LiveGithubIssueFragment,
  projectId?: string
): WorkItem => ({
  ...props,
  ignored: some(ignoredForProjects, { projectId }),
});
