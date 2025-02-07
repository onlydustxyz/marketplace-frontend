"use client";

import { useParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import ErrorFallback from "src/ErrorFallback";
import ContributorsTable from "src/_pages/ProjectDetails/Contributors/ContributorsTable";
import { Fields } from "src/_pages/ProjectDetails/Contributors/ContributorsTable/Headers";
import Title from "src/_pages/ProjectDetails/Title";
import ProjectApi from "src/api/Project";
import { IMAGES } from "src/assets/img";
import FormToggle from "src/components/FormToggle";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import Flex from "src/components/Utils/Flex";
import EyeOffLine from "src/icons/EyeOffLine";
import { RewardDisabledReason } from "src/types";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { Card } from "components/ds/card/card";
import { NewAppHelper } from "components/features/new-app-helper/new-app-helper";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

import { useIntl } from "hooks/translate/use-translate";

import ClaimBanner from "../Banners/ClaimBanner/ClaimBanner";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { RewardProjectButton } from "../components/RewardProjectButton";

export default function Contributors() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const isProjectLeader = false;

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

  const isInvited = false;

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
      <PosthogOnMount eventName={"project_contributors_list_viewed"} />

      <Title>
        <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
          {T("project.details.contributors.title")}
          {isProjectLeader && !hasOrgsWithUnauthorizedRepos ? (
            <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
              <EditProjectButton projectKey={slug} />
              <RewardProjectButton project={project} />
            </Flex>
          ) : null}
        </div>
      </Title>

      {isProjectLeader ? <NewAppHelper projectSlug={slug} /> : null}

      {!project?.indexingComplete ? <StillFetchingBanner /> : null}

      {isProjectLeader && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      <ProjectLeadInvitation
        projectId={project.id}
        size={CalloutSizes.Large}
        projectSlug={slug}
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
            projectKey: slug,
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
