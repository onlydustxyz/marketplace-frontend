import { useCallback } from "react";
import { useIgnoreContributionMutation, useUnignoreContributionMutation } from "src/__generated/graphql";

export function useIgnoredContributions(refetchContribution?: () => void) {
  const [ignoreContribution] = useIgnoreContributionMutation();
  const [unignoreContribution] = useUnignoreContributionMutation();

  const ignore = useCallback(
    (projectId: string, contributionId: string) =>
      ignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => {
          if (refetchContribution) {
            refetchContribution();
          }
        },
        // TO KEEP : Legacy cache update
        // update: cache => {
        //   cache.modify({
        //     id: `Contributions:${contributionId}`,
        //     fields: {
        //       ignored: () => true,
        //     },
        //   });
        // },
      }),
    [ignoreContribution]
  );

  const unignore = useCallback(
    (projectId: string, contributionId: string) =>
      unignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => {
          if (refetchContribution) {
            refetchContribution();
          }
        },
        // TO KEEP : Legacy cache update
        // update: cache => {
        //   cache.modify({
        //     id: `Contributions:${contributionId}`,
        //     fields: {
        //       ignored: () => false,
        //     },
        //   });
        // },
      }),
    [unignoreContribution]
  );

  return { ignore, unignore };
}
