import { reject } from "lodash";
import { useCallback } from "react";
import {
  GithubIssueDetailsFragment,
  GithubIssueDetailsFragmentDoc,
  IgnoreIssueDocument,
  IgnoreIssueMutationVariables,
  IgnoredGithubIssues,
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
          const { projectId, repoId, issueNumber } = variables as IgnoreIssueMutationVariables;
          const issue: GithubIssueDetailsFragment | null = cache.readFragment({
            fragment: GithubIssueDetailsFragmentDoc,
            id: `GithubIssues:${workItem.id}`,
          });

          if (issue) {
            const newIssue: GithubIssueDetailsFragment = {
              ...issue,
              ignoredForProjects: [
                {
                  projectId,
                  repoId,
                  issueNumber,
                  __typename: "IgnoredGithubIssues",
                },
                ...issue.ignoredForProjects,
              ],
            };

            cache.writeFragment({
              data: newIssue,
              fragment: GithubIssueDetailsFragmentDoc,
            });
          }
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
          const { projectId, repoId, issueNumber } = variables as IgnoreIssueMutationVariables;
          cache.modify({
            id: `GithubIssues:${workItem.id}`,
            fields: {
              ignoredForProjects: existing =>
                reject(existing, {
                  __ref: cache.identify({
                    projectId,
                    repoId,
                    issueNumber,
                    __typename: "IgnoredGithubIssues",
                  } as IgnoredGithubIssues),
                }),
            },
          });
        },
      }),
    [unignoreIssue]
  );

  return { ignore, unignore };
}
