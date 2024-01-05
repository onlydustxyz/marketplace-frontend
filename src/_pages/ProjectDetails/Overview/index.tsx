import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "src/components/Card";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import Flex from "src/components/Utils/Flex";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { SessionMethod, useSession, useSessionDispatch } from "src/hooks/useSession";
import Title from "src/_pages/ProjectDetails/Title";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { useMediaQuery } from "usehooks-ts";
import ClaimBanner from "../Banners/ClaimBanner/ClaimBanner";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import OverviewPanel from "./components/OverviewPanel";
import useApplications from "./useApplications";
import { useShowToaster } from "src/hooks/useToaster";
import MeApi from "src/api/me";
import ProjectApi from "src/api/Project";
import Skeleton from "src/components/Skeleton";
import { RewardProjectButton } from "../components/RewardProjectButton";
import { ProjectOverviewRepos } from "src/components/Project/Overview/OverviewRepos/OverviewRepos";
import { ProjectOverviewHeader } from "src/components/Project/Overview/OverviewHeader";
import ApplyCallout from "./components/ProjectApply";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "../../../../components/features/auth0/utils/getGithubUserIdFromSub.util.ts";

export default function Overview() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const dispatchSession = useSessionDispatch();

  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const { isAuthenticated, user } = useAuth0();
  const { lastVisitedProjectId } = useSession();

  const hiring = project?.hiring;
  const isProjectLeader = useProjectLeader({ id: project?.id });

  const { applyToProject } = useApplications(project?.id ?? "", projectKey);

  const { data: myProfileInfo, isError } = MeApi.queries.useGetMyProfileInfo({});

  const isInvited = !!project?.invitedLeaders.find(invite => invite.githubUserId === getGithubUserIdFromSub(user?.sub));

  useEffect(() => {
    if (project?.id && project?.id !== lastVisitedProjectId && isProjectLeader) {
      dispatchSession({ method: SessionMethod.SetLastVisitedProjectId, value: project?.id });
    }
  }, [project?.id, isProjectLeader]);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
  }

  if (isLoading) return <Skeleton variant="projectOverview" />;

  if (!project) return null;

  return (
    <>
      <Title>
        <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
          {T("project.details.overview.title")}
          {isProjectLeader && !hasOrgsWithUnauthorizedRepos ? (
            <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
              <EditProjectButton projectKey={project.slug} />
              <RewardProjectButton project={project} />
            </Flex>
          ) : null}
        </div>
      </Title>

      {!project.indexingComplete ? <StillFetchingBanner /> : null}

      {isProjectLeader && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      <ProjectLeadInvitation
        projectId={project.id}
        size={CalloutSizes.Large}
        projectSlug={project.slug}
        isInvited={isInvited}
        projectName={project?.name}
      />
      <ClaimBanner />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex grow flex-col gap-4">
          <Card className="flex flex-col gap-4 px-6 py-4">
            <ProjectOverviewHeader project={project} />
          </Card>
          {!isMd && <OverviewPanel project={project} />}

          <Card className="flex flex-col gap-4">
            <ProjectOverviewRepos project={project} />
          </Card>
        </div>
        <div className="flex shrink-0 flex-col gap-4 md:w-72 xl:w-80">
          {hiring && !project.me?.isMember && myProfileInfo && (
            <ApplyCallout
              {...{
                isAuthenticated,
                alreadyApplied: project.me?.hasApplied || false,
                applyToProject,
                profile: myProfileInfo,
              }}
            />
          )}
          {isMd && <OverviewPanel project={project} />}
        </div>
      </div>
    </>
  );
}
