import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "src/_pages/ProjectDetails/Title";
import MeApi from "src/api/me";
import ProjectApi from "src/api/Project";
import Card from "src/components/Card";
import { ProjectOverviewHeader } from "src/components/Project/Overview/OverviewHeader";
import { ProjectOverviewRepos } from "src/components/Project/Overview/OverviewRepos/OverviewRepos";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import Skeleton from "src/components/Skeleton";
import Flex from "src/components/Utils/Flex";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { useShowToaster } from "src/hooks/useToaster";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { useMediaQuery } from "usehooks-ts";
import ClaimBanner from "../Banners/ClaimBanner/ClaimBanner";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { RewardProjectButton } from "../components/RewardProjectButton";
import OverviewPanel from "./components/OverviewPanel";
import ApplyCallout from "./components/ProjectApply";
import useApplications from "./useApplications";

export default function Overview() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { capture } = usePosthog();

  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { data: project, isLoading } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  useEffect(() => {
    if (project) {
      capture("project_viewed", { id_project: project.id, type: "full" });
    }
  }, [project]);

  const { isAuthenticated, user } = useAuth0();

  const hiring = project?.hiring;
  const isProjectLeader = useProjectLeader({ id: project?.id });

  const { applyToProject } = useApplications(project?.id ?? "", projectKey);

  const { data: myProfileInfo, isError } = MeApi.queries.useGetMyProfileInfo({});

  const githubUserId = getGithubUserIdFromSub(user?.sub);

  const isInvited = !!project?.invitedLeaders.find(invite => invite.githubUserId === githubUserId);

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
