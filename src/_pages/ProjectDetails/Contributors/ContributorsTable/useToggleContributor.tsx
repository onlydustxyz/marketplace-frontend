import ProjectApi from "src/api/Project";
import { API_PATH } from "src/api/ApiPath";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { ProjectContributorItem } from "src/api/Project/queries";

interface Props {
  projectId: string;
}

export function useToggleContributor({ projectId }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { mutate: hideContributor } = ProjectApi.mutations.useHideContributor({
    params: { projectId },
    options: {
      enabled: Boolean(projectId),
      onSuccess: () => {
        showToaster(T("project.details.contributors.hideContributor.success"));
      },
      onError: () => {
        showToaster(T("project.details.contributors.hideContributor.error"), { isError: true });
      },
    },
  });

  const { mutate: showContributor } = ProjectApi.mutations.useShowContributor({
    params: { projectId },
    options: {
      enabled: Boolean(projectId),
      onSuccess: () => {
        showToaster(T("project.details.contributors.showContributor.success"));
      },
      onError: () => {
        showToaster(T("project.details.contributors.showContributor.error"), { isError: true });
      },
    },
  });

  const onToggleContributor = (contributor: ProjectContributorItem) => {
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
