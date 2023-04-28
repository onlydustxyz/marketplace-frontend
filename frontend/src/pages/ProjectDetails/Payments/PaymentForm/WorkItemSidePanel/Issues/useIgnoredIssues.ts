import { useCallback } from "react";
import { IgnoreIssueDocument, UnignoreIssueDocument } from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";

export default function useIgnoredIssues() {
  const [ignoreIssue] = useHasuraMutation(IgnoreIssueDocument, HasuraUserRole.RegisteredUser);
  const [unignoreIssue] = useHasuraMutation(UnignoreIssueDocument, HasuraUserRole.RegisteredUser);

  const ignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      ignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        context: { graphqlErrorDisplay: "toaster" },
        update: cache =>
          cache.modify({
            id: `GithubIssues:${workItem.id}`,
            fields: {
              ignoredForProjects: () => [{ projectId }],
            },
          }),
      }),
    [ignoreIssue]
  );

  const unignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      unignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        context: { graphqlErrorDisplay: "toaster" },
        update: cache =>
          cache.modify({
            id: `GithubIssues:${workItem.id}`,
            fields: {
              ignoredForProjects: () => [],
            },
          }),
      }),
    [unignoreIssue]
  );

  return { ignore, unignore };
}
