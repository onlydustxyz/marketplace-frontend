import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import ClaimBannerOrganization from "./components/Organization";
import InformationLine from "src/icons/InformationLine";
import SendPlane2Line from "src/icons/SendPlane2Line";
import FeedbackButton from "src/App/Layout/Header/FeedbackButton";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";

export default function ClaimBanner() {
  const { T } = useIntl();
  const [openClaimProjectModal, setOpenClaimProjectModal] = useState(false);
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: project, isSuccess } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });
  const poolingCount = useRef(0);

  const { data: myOrganizations, isRefetching } = MeApi.queries.useGithubOrganizations({
    options: {
      retry: 1,
      enabled: isSuccess && !project?.leaders.length && !project?.invitedLeaders.length,
      refetchOnWindowFocus: () => {
        poolingCount.current = 0;
        return true;
      },
      refetchInterval: () => {
        if (poolingCount.current < 4) {
          return 2000;
        }
        return 0;
      },
    },
  });

  useEffect(() => {
    if (isRefetching) {
      poolingCount.current = poolingCount.current + 1;
    }
  }, [isRefetching]);

  const { mutate: claimProjectMutation, ...restMutation } = MeApi.mutations.useClaimProject({
    params: { projectId: project?.id, projectSlug: project?.slug },
    options: {
      onSuccess: async () => {
        setOpenClaimProjectModal(false);
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
    if (project && myOrganizations) {
      if (project.leaders.length > 0 && project.invitedLeaders.length > 0) {
        return false;
      }

      const findMyOrganizationInProject = project?.organizations?.filter(org =>
        myOrganizations.find(meOrg => meOrg.id === org.id && (org.installed || meOrg.isCurrentUserAdmin))
      );

      if (!findMyOrganizationInProject?.length) {
        return false;
      }

      return findMyOrganizationInProject?.length === project.organizations?.length;
    }

    return false;
  }, [project, myOrganizations]);

  const canSubmit = useMemo(() => {
    if (!canDisplay) {
      return false;
    }

    const isAllOrganizationInstalled = project?.organizations?.every(org => org.installed);

    return isAllOrganizationInstalled || false;
  }, [project, myOrganizations, canDisplay]);

  const handleToggleClaimProjectModal = (value: boolean) => {
    setOpenClaimProjectModal(value);
  };

  const onBannerClick = () => {
    handleToggleClaimProjectModal(true);
  };

  const onCancel = () => {
    handleToggleClaimProjectModal(false);
  };

  const onSubmitClaim = () => {
    if (canSubmit) {
      claimProjectMutation({});
    }
  };

  useEffect(() => {
    if (searchParams?.get("claim_callback")) {
      searchParams.delete("claim_callback");
      handleToggleClaimProjectModal(true);
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  if (!canDisplay) {
    return null;
  }

  return (
    <>
      <RainbowBanner
        description={T("project.claim.banner.content", { projectName: project?.name || "" })}
        button={{
          name: T("project.claim.banner.button"),
          icon: <i className="ri-magic-line text-xl font-normal text-black" />,
          onClick: onBannerClick,
          size: ButtonSize.Sm,
        }}
      />
      <SidePanel open={openClaimProjectModal && canDisplay} setOpen={handleToggleClaimProjectModal}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col px-6 py-8">
            <div className="mb-8 font-belwe text-2xl font-normal text-greyscale-50">
              {T("project.claim.panel.title")}
            </div>
            <div>
              <div className="pb-2 font-belwe text-2xl font-normal text-greyscale-50">
                {T("project.claim.panel.subTitle")}
              </div>
              <div className="font-walsheim text-base font-normal text-spaceBlue-100">
                {T("project.claim.panel.content")}
              </div>
            </div>
            <div className="my-6 h-[1px] w-full bg-card-border-medium" />
            <div className="flex w-full flex-col items-start justify-start gap-3">
              {project?.organizations?.map(org => (
                <ClaimBannerOrganization
                  key={org.id}
                  organization={org}
                  myOrganizations={myOrganizations || []}
                  project={project}
                />
              ))}
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-start gap-0.5">
                <InformationLine className="text-base leading-4 text-spaceBlue-200" />
                <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
                  {T("project.claim.panel.info.title")}
                </p>
              </div>
              <p className="text-body-m mb-4 mt-2 font-walsheim font-normal text-gray-50">
                {T("project.claim.panel.info.message")}
              </p>
              <FeedbackButton
                customButton={
                  <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
                    <SendPlane2Line />
                    {T("project.claim.panel.info.button")}
                  </Button>
                }
              />
            </div>
          </div>
          <div className="flex h-auto w-full items-center justify-end gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
            {restMutation.isPending ? <Spinner /> : null}
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
      </SidePanel>
    </>
  );
}
