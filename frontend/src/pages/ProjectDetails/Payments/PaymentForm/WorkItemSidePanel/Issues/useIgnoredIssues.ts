import { useCallback, useLayoutEffect } from "react";
import { IgnoreIssueDocument, UnignoreIssueDocument } from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import useWorkItems from "src/pages/ProjectDetails/Payments/PaymentForm/useWorkItems";

export default function useIgnoredIssues(issues: WorkItem[]) {
  const { workItems, add, remove, clear } = useWorkItems();

  useLayoutEffect(() => {
    clear();
    add(issues);
  }, [issues]);

  const [ignoreIssue] = useHasuraMutation(IgnoreIssueDocument, HasuraUserRole.RegisteredUser);
  const [unignoreIssue] = useHasuraMutation(UnignoreIssueDocument, HasuraUserRole.RegisteredUser);

  const ignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      ignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => add(workItem),
        update: cache =>
          cache.modify({
            id: `Issue:${workItem.id}`,
            fields: {
              ignoredForProjects: () => [{ projectId }],
            },
          }),
      }),
    [ignoreIssue, add]
  );

  const unignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      unignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => remove(workItem),
        update: cache =>
          cache.modify({
            id: `Issue:${workItem.id}`,
            fields: {
              ignoredForProjects: () => [],
            },
          }),
      }),
    [unignoreIssue, remove]
  );

  return { issues: workItems, ignore, unignore };
}
