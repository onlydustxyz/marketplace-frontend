import { useCallback } from "react";
import { useIgnoreContributionMutation, useUnignoreContributionMutation } from "src/__generated/graphql";

export function useIgnoredContributions(onCompleted?: () => void) {
  const [ignoreContribution] = useIgnoreContributionMutation();
  const [unignoreContribution] = useUnignoreContributionMutation();

  const ignore = useCallback(
    (projectId: string, contributionId: string) =>
      ignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => {
          onCompleted?.();
        },
      }),
    [ignoreContribution]
  );

  const unignore = useCallback(
    (projectId: string, contributionId: string) =>
      unignoreContribution({
        variables: { projectId, contributionId },
        context: { graphqlErrorDisplay: "toaster" },
        onCompleted: () => {
          onCompleted?.();
        },
      }),
    [unignoreContribution]
  );

  return { ignore, unignore };
}
