import { useCallback } from "react";
import {
  IgnoreIssueDocument,
  IgnoredGithubIssueIdFragment,
  IgnoredGithubIssueIdFragmentDoc,
  UnignoreIssueDocument,
} from "src/__generated/graphql";
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
        update: (cache, _, { variables }) => {
          const ignoredIssue = cache.writeFragment({
            data: ignoredIssueFragment(variables),
            fragment: IgnoredGithubIssueIdFragmentDoc,
          });
          cache.modify({
            id: `GithubIssues:${workItem.id}`,
            fields: {
              ignoredForProjects: existing => [...existing, ignoredIssue],
            },
          });
          console.log(cache);
        },
      }),
    [ignoreIssue]
  );

  const unignore = useCallback(
    (projectId: string, workItem: WorkItem) =>
      unignoreIssue({
        variables: { projectId, repoId: workItem.repoId, issueNumber: workItem.number },
        context: { graphqlErrorDisplay: "toaster" },
        update: (cache, _, { variables }) => {
          const ignoredIssue = ignoredIssueFragment(variables);
          cache.evict({ id: cache.identify(ignoredIssue) });
        },
      }),
    [unignoreIssue]
  );

  return { ignore, unignore };
}

const ignoredIssueFragment = (
  issue?: Partial<IgnoredGithubIssueIdFragment>
): Partial<IgnoredGithubIssueIdFragment> => ({
  __typename: "IgnoredGithubIssues",
  ...issue,
});
