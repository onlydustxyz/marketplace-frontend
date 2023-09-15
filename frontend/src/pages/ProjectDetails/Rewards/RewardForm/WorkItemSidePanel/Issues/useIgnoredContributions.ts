import { useCallback } from "react";
import { useIgnoreContributionMutation, useUnignoreContributionMutation } from "src/__generated/graphql";

export function useIgnoredContributions() {
  const [ignoreContribution] = useIgnoreContributionMutation();
  const [unignoreContribution] = useUnignoreContributionMutation();

  const ignore = useCallback(
    (projectId: string, contributionId: string) =>
      ignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        update: cache => {
          cache.modify({
            id: `Contributions:${contributionId}`,
            fields: {
              ignored: () => true,
            },
          });
        },
      }),
    [ignoreContribution]
  );

  const unignore = useCallback(
    (projectId: string, contributionId: string) =>
      unignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        update: cache => {
          cache.modify({
            id: `Contributions:${contributionId}`,
            fields: {
              ignored: () => false,
            },
          });
        },
      }),
    [unignoreContribution]
  );

  return { ignore, unignore };
}
