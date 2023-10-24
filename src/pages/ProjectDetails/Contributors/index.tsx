import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useIntl } from "src/hooks/useIntl";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import Title from "src/pages/ProjectDetails/Title";
import Button, { ButtonSize } from "src/components/Button";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { withTooltip } from "src/components/Tooltip";
import { rates } from "src/hooks/useWorkEstimation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import { Project } from "src/types";
import useInfiniteContributorList from "src/hooks/useInfiniteContributorList/useInfiniteContributorList";
import ErrorFallback from "src/ErrorFallback";
import { useMemo, useState } from "react";
import Skeleton from "src/components/Skeleton";

type OutletContext = {
  project: Project;
};

export enum Field {
  ContributionCount = "CONTRIBUTION_COUNT",
  TotalEarned = "EARNED",
  Login = "LOGIN",
  RewardCount = "REWARD_COUNT",
  ToRewardCount = "TO_REWARD_COUNT",
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

export default function Contributors() {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const navigate = useNavigate();
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  const { project } = useOutletContext<OutletContext>();

  const { id: projectId, slug: projectKey } = project;

  const isProjectLeader = ledProjectIds.includes(projectId);

  const remainingBudget = project?.remainingUsdBudget;
  const isRewardDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  const [sorting, setSorting] = useState({
    field: isProjectLeader ? Field.ToRewardCount : Field.ContributionCount,
    ascending: false,
  });

  const applySorting = (field: Field, ascending: boolean) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending });

  const queryParams = useMemo(
    () => [
      ...(sorting
        ? [
            { key: "sort", value: [sorting.field] },
            { key: "direction", value: [sorting.ascending ? "ASC" : "DESC"] },
          ]
        : []),
    ],
    [sorting]
  );

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

  const contributors = data?.pages.flatMap(page => page.contributors) || [];

  return (
    <>
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
      <ProjectLeadInvitation projectId={projectId} size={CalloutSizes.Large} />
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
            applySorting,
          }}
        />
      )}
      {!isFetching && contributors?.length === 0 && <ContributorsTableFallback />}
    </>
  );
}
