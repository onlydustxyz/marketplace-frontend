"use client";

import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Skeleton from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import { usePosthog } from "src/hooks/usePosthog";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Flex } from "components/layout/flex/flex";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

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

  const { data: project, isLoading } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug },
  });

  const { mutate: acceptProjectLeadInvitation, ...restAcceptProjectLeadInvitation } =
    MeApi.mutations.useAcceptProjectLeaderInvitation({
      params: { projectId: project?.id || "", projectSlug: slug },
    });

  const { githubUserId } = useCurrentUser();

  const isProjectLeader = useProjectLeader({ id: project?.id });

  const isInvited = useMemo(() => {
    return !!project?.invitedLeaders.find(invite => invite.githubUserId === githubUserId);
  }, [project?.invitedLeaders, githubUserId]);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

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
      capture("project_viewed", { id_project: project.id, type: "full", issues: project.goodFirstIssueCount });
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
        <Flex direction="col" className="flex-1 gap-6 overflow-x-hidden md:gap-4">
          <OverviewInformations project={project} />

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
            <ProjectDetails project={project} />
            <Repositories organizations={project.organizations} />
          </Flex>
        ) : null}
      </Flex>
    </>
  );
}

export default withClientOnly(ProjectPage);
