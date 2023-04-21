import { useCallback } from "react";
import { IgnoreIssueDocument } from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";

export default function useIgnoredIssues() {
  const [ignoreIssue] = useHasuraMutation(IgnoreIssueDocument, HasuraUserRole.RegisteredUser);

  const ignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      ignoreIssue({ variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number } }),
    [ignoreIssue]
  );

  return { ignore };
}
