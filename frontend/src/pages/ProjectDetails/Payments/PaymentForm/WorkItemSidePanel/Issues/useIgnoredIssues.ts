import { useCallback, useLayoutEffect } from "react";
import { IgnoreIssueDocument } from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import useWorkItems from "src/pages/ProjectDetails/Payments/PaymentForm/useWorkItems";

export default function useIgnoredIssues(issues: WorkItem[]) {
  const { workItems, add, clear } = useWorkItems();

  useLayoutEffect(() => {
    clear();
    issues.forEach(add);
  }, [issues]);

  const [ignoreIssue] = useHasuraMutation(IgnoreIssueDocument, HasuraUserRole.RegisteredUser);

  const ignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      ignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        onCompleted: () => add(workItem),
      }),
    [ignoreIssue, add]
  );

  return { issues: workItems, ignore };
}
