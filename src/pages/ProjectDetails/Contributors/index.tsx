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
import { useInfiniteContributors } from "src/hooks/useInfiniteContributorsList/useInfiniteContributorsList";

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

  const { status, data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteContributors({
    projectId,
  });

  console.log({ status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage });

  return (
    <div>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.contributors.map(contributor => (
                <div key={contributor.githubUserId}>{contributor.githubUserId}</div>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Background Updating..." : null}</div>
        </>
      )}
    </div>
  );

  // const [pageIndex, setPageIndex] = useState(0);
  // const [pageSize, setPageSize] = useState(10);

  // const queryParams = useMemo(
  //   () => [
  //     { key: "page_index", value: [pageIndex] },
  //     { key: "page_size", value: [pageSize] },
  //   ],
  //   [pageIndex, pageSize]
  // );

  // const { data, isLoading, isError } = useRestfulData({
  //   resourcePath: ApiResourcePaths.GET_PROJECT_CONTRIBUTORS,
  //   pathParam: projectId,
  //   queryParams,
  //   method: "GET",
  // });

  // if (isLoading) return <div>Loading...</div>;

  // if (isError) return <div>Error...</div>;

  // if (!data) return <div>No data</div>;

  // const { contributors, totalPageNumber, totalItemNumber, hasMore } = data as ContributorsT;

  // const remainingBudget = project?.remainingUsdBudget;
  // const isRewardDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  // return (
  //   <>
  //     <ul>
  //       {data?.contributors?.map((contributor: ContributorT) => (
  //         <li key={contributor.githubUserId}>
  //           <span>githubUserId: {contributor.githubUserId}</span>
  //           <span>login: {contributor.login}</span>
  //           <span>earned: {contributor.earned}</span>
  //         </li>
  //       ))}
  //     </ul>
  //     {hasMore && <button onClick={() => setPageIndex(pageIndex + 1)}>Show More</button>}
  //   </>
  // );

  // return (
  //   <>
  //     <Title>
  //       <div className="flex flex-row items-center justify-between gap-2">
  //         {T("project.details.contributors.title")}
  //         {isProjectLeader && !isLoading && (
  //           <Button
  //             size={ButtonSize.Sm}
  //             disabled={isRewardDisabled}
  //             onClick={() =>
  //               navigate(
  //                 generatePath(
  //                   `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
  //                   {
  //                     projectKey,
  //                   }
  //                 )
  //               )
  //             }
  //             {...withTooltip(T("contributor.table.noBudgetLeft"), {
  //               visible: isRewardDisabled,
  //             })}
  //           >
  //             {isSm ? T("project.rewardButton.full") : T("project.rewardButton.short")}
  //           </Button>
  //         )}
  //       </div>
  //     </Title>
  //     <ProjectLeadInvitation projectId={projectId} size={CalloutSizes.Large} />
  //     {contributors?.length > 0 ? (
  //       <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId, projectKey }} />
  //     ) : (
  //       <ContributorsTableFallback projectName={project?.name} />
  //     )}
  //   </>
  // );
}
