"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Skeleton from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { useShowToaster } from "src/hooks/useToaster";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { Flex } from "components/layout/flex/flex";

import { useApplication } from "hooks/projects/use-application/use-application";

import { ClaimBanner } from "./components/banner/claim-banner/claim-banner";
import { MissingGithubAppInstallBanner } from "./components/banner/missing-github-app-install-banner/missing-github-app-install-banner";
import { StillFetchingBanner } from "./components/banner/still-fetching-banner/still-fetching-banner";
import { ProjectHeader } from "./components/project-header/project-header";
import { GoodFirstIssues } from "./features/good-first-issues/good-first-issues";
import { OverviewInformations } from "./features/overview-informations/overview-informations";
import { Repositories } from "./features/repositories/repositories";

// TODO: Add translate in new files
// TODO: Refacto Flex with md:
// TODO: Refacto Skeleton
export default function ProjectPage() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { capture } = usePosthog();

  const { slug = "" } = useParams<{ slug: string }>();
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });
  const { mutate: acceptProjectLeadInvitation, ...restAcceptProjectLeadInvitation } =
    MeApi.mutations.useAcceptProjectLeaderInvitation({
      params: { projectId: project?.id || "", projectSlug: slug },
    });

  const { isAuthenticated, user } = useAuth0();

  const isProjectLeader = useProjectLeader({ id: project?.id });

  const { applyToProject } = useApplication({ projectId: project?.id ?? "", projectSlug: slug });

  const { data: myProfileInfo, isError } = MeApi.queries.useGetMyProfileInfo({});

  const githubUserId = getGithubUserIdFromSub(user?.sub);

  const isInvited = !!project?.invitedLeaders.find(invite => invite.githubUserId === githubUserId);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const onAcceptInvitation = () => {
    acceptProjectLeadInvitation(null);
  };

  useMutationAlert({
    mutation: restAcceptProjectLeadInvitation,
    success: {
      message: T("projectLeadInvitation.success", { projectName: project?.name }),
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

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
  }

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
        <Flex direction="col" className="grow gap-4">
          <OverviewInformations project={project} />
          <GoodFirstIssues projectId={project.id} organizations={project.organizations} />
        </Flex>

        <Flex direction="col" className="shrink-0 gap-4 md:w-72 xl:w-80">
          <Repositories organizations={project.organizations} />
        </Flex>
      </Flex>
    </>
  );
}
