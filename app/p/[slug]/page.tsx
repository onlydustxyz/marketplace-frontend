"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Skeleton from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { ApplyCallout } from "components/features/apply-callout/apply-callout";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Flex } from "components/layout/flex/flex";

import { useApplication } from "hooks/projects/use-application/use-application";

import { ClaimBanner } from "./components/banner/claim-banner/claim-banner";
import { MissingGithubAppInstallBanner } from "./components/banner/missing-github-app-install-banner/missing-github-app-install-banner";
import { StillFetchingBanner } from "./components/banner/still-fetching-banner/still-fetching-banner";
import { ProjectHeader } from "./components/project-header/project-header";
import { GoodFirstIssues } from "./features/good-first-issues/good-first-issues";
import { OverviewInformations } from "./features/overview-informations/overview-informations";
import { ProjectDetails } from "./features/project-details/project-details";
import { Repositories } from "./features/repositories/repositories";

// TODO: Refacto Skeleton with new one
function ProjectPage() {
  const { T } = useIntl();
  const { capture } = usePosthog();

  const { slug = "" } = useParams<{ slug: string }>();
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });
  const { mutate: acceptProjectLeadInvitation, ...restAcceptProjectLeadInvitation } =
    MeApi.mutations.useAcceptProjectLeaderInvitation({
      params: { projectId: project?.id || "", projectSlug: slug },
    });

  const { user } = useAuth0();

  const isProjectLeader = useProjectLeader({ id: project?.id });

  const { applyToProject } = useApplication({ projectId: project?.id ?? "", projectSlug: slug });

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const githubUserId = getGithubUserIdFromSub(user?.sub);

  const isInvited = useMemo(() => {
    return !!project?.invitedLeaders.find(invite => invite.githubUserId === githubUserId);
  }, [project?.invitedLeaders, githubUserId]);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const alreadyApplied = project?.me?.hasApplied || false;

  const onAcceptInvitation = () => {
    acceptProjectLeadInvitation(null);
  };

  useMutationAlert({
    mutation: restAcceptProjectLeadInvitation,
    success: {
      message: T("v2.features.banners.projectLeadInvitation.success", { projectName: project?.name }),
    },
    error: {
      default: true,
    },
  });

  useEffect(() => {
    if (project) {
      capture("project_viewed", { id_project: project.id, type: "full" });
    }
  }, [project]);

  if (isLoading) return <Skeleton variant="projectOverview" />;

  if (!project) return null;

  return (
    <>
      <ProjectHeader
        isProjectLeader={isProjectLeader}
        hasOrgsWithUnauthorizedRepos={hasOrgsWithUnauthorizedRepos}
        project={project}
      />

      {!project.indexingComplete ? <StillFetchingBanner /> : null}

      {isProjectLeader && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} organizations={orgsWithUnauthorizedRepos} />
      ) : null}

      {isInvited ? (
        <ProjectLeadInvitationBanner
          projectName={project?.name}
          on="cards"
          size="l"
          onClick={onAcceptInvitation}
          isLoading={restAcceptProjectLeadInvitation.isPending}
        />
      ) : null}

      <ClaimBanner project={project} />

      <Flex className="flex-col gap-6 md:flex-row">
        <Flex direction="col" className="grow gap-6 md:gap-4">
          <OverviewInformations project={project} />

          {!isMd && project.hiring && !project.me?.isMember && myProfileInfo && (
            <ApplyCallout
              icon={{ remixName: "ri-user-3-line", size: 20 }}
              title="v2.pages.project.overview.apply.title"
              description={
                alreadyApplied
                  ? "v2.pages.project.overview.apply.informations.alreadyApply"
                  : "v2.pages.project.overview.apply.informations.notYetApply"
              }
              formDescription="v2.pages.project.overview.apply.contactNeeded"
              buttonNotConnected="v2.pages.project.overview.apply.button.connectToApply"
              buttonConnected="v2.pages.project.overview.apply.button.apply"
              profile={myProfileInfo}
              applyToProject={applyToProject}
              alreadyApplied={alreadyApplied}
            />
          )}

          {!isMd ? <ProjectDetails project={project} /> : null}

          <GoodFirstIssues
            projectId={project.id}
            organizations={project.organizations}
            isProjectLeader={isProjectLeader}
          />

          {!isMd ? <Repositories organizations={project.organizations} /> : null}
        </Flex>

        {isMd ? (
          <Flex direction="col" className="shrink-0 gap-4 md:w-72 xl:w-80">
            {project.hiring && !project.me?.isMember && myProfileInfo && (
              <ApplyCallout
                icon={{ remixName: "ri-user-3-line", size: 20 }}
                title="v2.pages.project.overview.apply.title"
                description={
                  alreadyApplied
                    ? "v2.pages.project.overview.apply.informations.alreadyApply"
                    : "v2.pages.project.overview.apply.informations.notYetApply"
                }
                formDescription="v2.pages.project.overview.apply.contactNeeded"
                buttonNotConnected="v2.pages.project.overview.apply.button.connectToApply"
                buttonConnected="v2.pages.project.overview.apply.button.apply"
                profile={myProfileInfo}
                applyToProject={applyToProject}
                alreadyApplied={alreadyApplied}
              />
            )}

            <ProjectDetails project={project} />
            <Repositories organizations={project.organizations} />
          </Flex>
        ) : null}
      </Flex>
    </>
  );
}

export default withClientOnly(ProjectPage);
