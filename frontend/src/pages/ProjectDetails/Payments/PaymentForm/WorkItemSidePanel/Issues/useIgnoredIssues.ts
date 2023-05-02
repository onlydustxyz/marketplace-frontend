import { useCallback } from "react";
import {
  IgnoredGithubIssueIdFragment,
  IgnoredGithubIssueIdFragmentDoc,
  useIgnoreIssueMutation,
  useUnignoreIssueMutation,
} from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";

export default function useIgnoredIssues() {
  const [ignoreIssue] = useIgnoreIssueMutation();
  const [unignoreIssue] = useUnignoreIssueMutation();

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
