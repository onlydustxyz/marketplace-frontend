import { useCallback, useState } from "react";
import ProjectApi from "src/api/Project";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

export function useIgnoredContributions(projectId: string) {
  const { T } = useIntl();
  const [isIgnore, setIsIgnore] = useState(true);

  const { mutate: ignoreUnignoreContribution, ...restUnignoreContributionMutation } =
    ProjectApi.mutations.useIgnoreUnignoreContribution({
      params: { projectId },
    });

  useMutationAlert({
    mutation: restUnignoreContributionMutation,
    success: {
      message: T("reward.form.contributions.ignoreUnignoreContribution.success", {
        action: isIgnore ? "ignored" : "unignored",
      }),
    },
    error: {
      message: T("reward.form.contributions.ignoreUnignoreContribution.error", {
        action: isIgnore ? "ignored" : "unignored",
      }),
    },
  });

  const ignore = useCallback(
    (contributionId: string) => {
      ignoreUnignoreContribution({ contributionsToIgnore: [contributionId] });
      setIsIgnore(true);
    },
    [ignoreUnignoreContribution]
  );

  const unignore = useCallback(
    (contributionId: string) => {
      ignoreUnignoreContribution({ contributionsToUnignore: [contributionId] });
      setIsIgnore(false);
    },
    [ignoreUnignoreContribution]
  );

  return { ignore, unignore };
}
