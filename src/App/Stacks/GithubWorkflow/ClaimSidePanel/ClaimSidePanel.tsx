import { useEffect, useMemo } from "react";
import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import ClaimBannerOrganization from "./components/Organization";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";
import { usePooling } from "src/hooks/usePooling/usePooling";
import { useStackGithubWorkflowClaim } from "../../Stacks";
import { ClaimUtils } from "./claim.utils";

export interface ClaimSidePanelProps {
  projectSlug: string;
}
export default function ClaimSidePanel({ projectSlug }: ClaimSidePanelProps) {
  const { T } = useIntl();
  const { data: project, isSuccess } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectSlug } });
  const [, closePanel] = useStackGithubWorkflowClaim();
  const { refetchOnWindowFocus, refetchInterval, onRefetching } = usePooling({
    limites: 4,
    delays: 3000,
  });

  const { data: myOrganizations, isRefetching } = MeApi.queries.useGithubOrganizations({
    options: {
      retry: 1,
      enabled: isSuccess && !project?.leaders.length && !project?.invitedLeaders.length,
      refetchOnWindowFocus,
      refetchInterval,
    },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  const { mutate: claimProjectMutation, ...restMutation } = MeApi.mutations.useClaimProject({
    params: { projectId: project?.id, projectSlug: project?.slug },
    options: {
      onSuccess: async () => {
        closePanel();
      },
    },
  });

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("project.claim.panel.success"),
    },
    error: {
      default: true,
    },
  });

  const canDisplay = useMemo(() => {
    return ClaimUtils.canDisplay({ project });
  }, [project, myOrganizations]);

  const canSubmit = useMemo(() => {
    return ClaimUtils.canSubmit({ project, organizations: myOrganizations });
  }, [project, myOrganizations, canDisplay]);

  const onCancel = () => {
    closePanel();
  };

  const onSubmitClaim = () => {
    if (canSubmit) {
      claimProjectMutation({});
    }
  };

  if (!canDisplay) {
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 py-8">
        <div className="mb-8 px-2 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.claim.panel.title")}
        </div>
        <div className="px-2">
          <div className="text-title-s pb-2 font-normal text-greyscale-50">{T("project.claim.panel.subTitle")}</div>
          <div className="text-body-m font-normal text-spaceBlue-100">{T("project.claim.panel.content")}</div>
        </div>
        <div className="my-6 h-px w-full bg-card-border-medium" />
        <div className="scrollbar-sm flex flex-1 flex-col gap-6 overflow-auto px-2 pb-24">
          <div className="flex w-full flex-col items-start justify-start gap-3">
            {project?.organizations?.map(org => (
              <ClaimBannerOrganization
                key={org.githubUserId}
                organization={org}
                myOrganizations={myOrganizations || []}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
          {/* // empty div to keep the flex layout */}
          {restMutation.isPending ? <Spinner /> : <div />}
          <div className="flex items-center justify-end gap-5 ">
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Md}
              onClick={onCancel}
              disabled={restMutation.isPending}
            >
              {T("project.claim.panel.cancel")}
            </Button>
            <Button
              type={ButtonType.Primary}
              size={ButtonSize.Md}
              disabled={!canSubmit || restMutation.isPending}
              onClick={onSubmitClaim}
            >
              {T("project.claim.panel.submit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
