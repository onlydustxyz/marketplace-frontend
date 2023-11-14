import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import Button, { ButtonSize } from "src/components/Button";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import { withTooltip } from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { useAuth } from "src/hooks/useAuth";
import useInfiniteContributorList from "src/hooks/useInfiniteContributorList/useInfiniteContributorList";
import { useIntl } from "src/hooks/useIntl";
import { rates } from "src/hooks/useWorkEstimation";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { Fields } from "src/pages/ProjectDetails/Contributors/ContributorsTable/Headers";
import Title from "src/pages/ProjectDetails/Title";
import { useMediaQuery } from "usehooks-ts";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { components } from "src/__generated/api";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

type OutletContext = {
  project: components["schemas"]["ProjectResponse"];
};

export default function Contributors() {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const navigate = useNavigate();
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  const { project } = useOutletContext<OutletContext>();

  const { id: projectId, slug: projectKey } = project;
  const isInvited = !!project.invitedLeaders.find(invite => invite.githubUserId === githubUserId);

  const isProjectLeader = useProjectLeader({ id: projectId });

  const remainingBudget = project?.remainingUsdBudget;
  const isRewardDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: isProjectLeader ? Fields.ToRewardCount : Fields.ContributionCount,
    isAscending: false,
    storageKey: "projectContributorsSorting",
  });

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteContributorList({
    projectId,
    queryParams,
  });

  if (isFetching && !isFetchingNextPage) {
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

  const contributors = data?.pages.flatMap(page => page.contributors) ?? [];

  return (
    <>
      <StillFetchingBanner createdAt={project?.createdAt} />
      <Title>
        <div className="flex flex-row items-center justify-between gap-2">
          {T("project.details.contributors.title")}
          {isProjectLeader && !isFetching && (
            <Button
              size={ButtonSize.Sm}
              disabled={isRewardDisabled}
              onClick={() =>
                navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                )
              }
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
            >
              {isSm ? T("project.rewardButton.full") : T("project.rewardButton.short")}
            </Button>
          )}
        </div>
      </Title>
      <ProjectLeadInvitation
        projectId={projectId}
        size={CalloutSizes.Large}
        projectSlug={projectKey}
        isInvited={isInvited}
        projectName={project?.name}
      />
      {contributors?.length > 0 && (
        <ContributorsTable
          {...{
            contributors,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            isProjectLeader,
            remainingBudget,
            projectId,
            projectKey,
            sorting,
            sortField,
          }}
        />
      )}
      {!isFetching && contributors?.length === 0 && <ContributorsTableFallback projectName={project?.name} />}
    </>
  );
}
