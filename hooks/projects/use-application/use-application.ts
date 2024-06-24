import { useMemo } from "react";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";

import { useIntl } from "hooks/translate/use-translate";

import { TUseApplication } from "./use-application.types";

export const useApplication = ({ projectId, projectSlug }: TUseApplication.Props): TUseApplication.Return => {
  const { T } = useIntl();
  const { data: userData } = MeApi.queries.useGetMe({});

  const { mutate: applyProjectMutation, ...restMutation } = MeApi.mutations.useApplyProject({
    params: { projectSlug },
  });

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.pages.project.overview.apply.confirmationToaster"),
    },
    error: {
      default: true,
    },
  });

  const alreadyApplied = useMemo(() => {
    return !!userData?.projectsAppliedTo?.find(appliedTo => appliedTo === projectId);
  }, [userData?.projectsAppliedTo, projectId]);

  return {
    alreadyApplied,
    applyToProject: () => (projectId ? applyProjectMutation({ projectId }) : undefined),
  };
};
