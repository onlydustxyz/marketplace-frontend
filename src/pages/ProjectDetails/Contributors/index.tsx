import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useIntl } from "src/hooks/useIntl";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import Title from "src/pages/ProjectDetails/Title";
import useProjectContributors from "src/hooks/useProjectContributors";
import { useGetProjectDetailsQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import Button, { ButtonSize } from "src/components/Button";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { withTooltip } from "src/components/Tooltip";
import { rates } from "src/hooks/useWorkEstimation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import { Project, Contributors as ContributorsT, ContributorT } from "src/types";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTokenSet } from "src/hooks/useTokenSet";
import React from "react";
import useInfiniteContributorList from "src/hooks/useInfiniteContributorList/useInfiniteContributorList";
import { e } from "vitest/dist/index-5aad25c1";
import ErrorFallback from "src/ErrorFallback";

type OutletContext = {
  project: Project;
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

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteContributorList({
    projectId,
  });

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
          }}
        />
      )}
      {!isFetching && contributors?.length === 0 && <ContributorsTableFallback />}
    </>
  );
}
