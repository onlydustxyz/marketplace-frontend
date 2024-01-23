import ProjectApi from "src/api/Project";
import useMutationAlert from "src/api/useMutationAlert.ts";
import { API_PATH } from "src/api/ApiPath.ts";
import { useIntl } from "src/hooks/useIntl.tsx";
import { components } from "src/__generated/api";

interface Props {
  projectId: string;
}

export function useToggleContributor({ projectId }: Props) {
  const { T } = useIntl();
  const { mutate: hideContributor, ...restHideContributorMutation } = ProjectApi.mutations.useHideContributor({
    params: { projectId },
    options: { enabled: Boolean(projectId) },
  });

  const { mutate: showContributor, ...restShowContributorMutation } = ProjectApi.mutations.useShowContributor({
    params: { projectId },
    options: { enabled: Boolean(projectId) },
  });

  useMutationAlert({
    mutation: restHideContributorMutation,
    success: {
      message: T("project.details.contributors.hideContributor.success"),
    },
    error: {
      message: T("project.details.contributors.hideContributor.error"),
    },
  });

  useMutationAlert({
    mutation: restShowContributorMutation,
    success: {
      message: T("project.details.contributors.showContributor.success"),
    },
    error: {
      message: T("project.details.contributors.showContributor.error"),
    },
  });

  const onToggleContributor = (contributor: components["schemas"]["ContributorPageItemResponse"]) => {
    if (contributor.hidden) {
      showContributor({
        resourcePath: API_PATH.PROJECT_SHOW_CONTRIBUTOR(projectId || "", contributor?.githubUserId.toString() || ""),
      });
    } else {
      hideContributor({
        resourcePath: API_PATH.PROJECT_HIDE_CONTRIBUTOR(projectId || "", contributor?.githubUserId.toString() || ""),
      });
    }
  };

  return { onToggleContributor };
}
