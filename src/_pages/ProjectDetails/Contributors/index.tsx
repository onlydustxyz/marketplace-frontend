import { useParams } from "react-router-dom";
import ErrorFallback from "src/ErrorFallback";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import ContributorsTable from "src/_pages/ProjectDetails/Contributors/ContributorsTable";
import { Fields } from "src/_pages/ProjectDetails/Contributors/ContributorsTable/Headers";
import Title from "src/_pages/ProjectDetails/Title";
import { RewardDisabledReason } from "src/types";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import ClaimBanner from "../Banners/ClaimBanner/ClaimBanner";
import ProjectApi from "src/api/Project";
import { RewardProjectButton } from "../components/RewardProjectButton";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { IMAGES } from "src/assets/img";
import { EmptyState } from "components/layout/placeholders/empty-state.tsx";
import { Card } from "components/ds/card/card.tsx";
import EyeOffLine from "../../../icons/EyeOffLine.tsx";
import FormToggle from "../../../components/FormToggle";
import { useForm, useWatch } from "react-hook-form";

export default function Contributors() {
  const { T } = useIntl();
  const { user } = useAuth0();
  const { projectKey = "" } = useParams<{ projectKey: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const isProjectLeader = useProjectLeader({ id: project?.id });

  const showHiddenContributorsName = "show-hidden-contributors";
  const { control } = useForm({
    defaultValues: { [showHiddenContributorsName]: false },
  });

  const showHiddenContributors = useWatch({
    control,
    name: showHiddenContributorsName,
  });

  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: isProjectLeader ? Fields.ToRewardCount : Fields.ContributionCount,
    isAscending: false,
    storageKey: "projectContributorsSorting",
  });

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributorsInfiniteList({
      params: {
        projectId: project?.id ?? "",
        pageSize: 30,
        queryParams: {
          ...(queryParams as URLSearchParams),
          showHidden: showHiddenContributors?.toString(),
        },
      },
      options: { enabled: Boolean(project?.id) },
    });

  const [{ hasHiddenContributors = false }] = data?.pages ?? [{}];

  const contributors = data?.pages.flatMap(page => page.contributors) ?? [];

  const githubUserId = getGithubUserIdFromSub(user?.sub);

  const isInvited = !!project?.invitedLeaders.find(invite => invite.githubUserId === githubUserId);

  const noBudget = !project?.hasRemainingBudget;

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  function getRewardDisableReason() {
    if (noBudget) {
      return RewardDisabledReason.Budget;
    }

    if (isProjectLeader && hasOrgsWithUnauthorizedRepos) {
      return RewardDisabledReason.GithubApp;
    }
  }

  if ((isFetching && !isFetchingNextPage) || isLoadingProject) {
    return (
      <>
        <div className="max-w-[15%]">
          <Skeleton variant="counter" />
        </div>
        <Skeleton variant="contributorList" />
      </>
    );
  }

  if (error) {
    return <ErrorFallback />;
  }

  if (!project) return null;

  return (
    <>
      <Title>
        <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
          {T("project.details.contributors.title")}
          {isProjectLeader && !hasOrgsWithUnauthorizedRepos ? (
            <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
              <EditProjectButton projectKey={projectKey} />
              <RewardProjectButton project={project} />
            </Flex>
          ) : null}
        </div>
      </Title>

      {!project?.indexingComplete ? <StillFetchingBanner /> : null}

      {isProjectLeader && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      <ProjectLeadInvitation
        projectId={project.id}
        size={CalloutSizes.Large}
        projectSlug={projectKey}
        isInvited={isInvited}
        projectName={project?.name}
      />
      <ClaimBanner />
      {hasHiddenContributors && isProjectLeader ? (
        <div className="flex flex-row justify-end gap-2 font-walsheim text-sm font-normal text-greyscale-50">
          <EyeOffLine />

          <div className="inline xl:flex">{T("reward.form.contributions.showIgnored")}</div>
          <FormToggle name={showHiddenContributorsName} control={control} />
        </div>
      ) : null}
      {contributors?.length > 0 && (
        <ContributorsTable
          {...{
            contributors,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            isProjectLeader,
            projectId: project.id,
            projectKey,
            sorting,
            sortField,
            rewardDisableReason: getRewardDisableReason(),
          }}
        />
      )}
      {!isFetching && contributors?.length === 0 && (
        <Card>
          <EmptyState
            illustrationSrc={IMAGES.global.categories}
            title={{
              token: "contributor.tableFallback.noContributor",
              params: { projectName: project?.name },
            }}
            description={{ token: "contributor.tableFallback.relevantProfiles" }}
          />
        </Card>
      )}
    </>
  );
}
