import Skeleton, { SkeletonVariant } from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "..";
import { useMatch } from "react-router-dom";
import { ContributionTableSkeleton } from "src/components/Contribution/ContributionTableSkeleton";

export default function ProjectDetailsLoader() {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const matches = {
    isProjectOverview: useMatch(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Overview}`),
    isProjectContributors: useMatch(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Contributors}`),
    isProjectRewards: useMatch(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}`),
    isProjectRewardForm: useMatch(`${RoutePaths.ProjectDetails}/${ProjectRewardsRoutePaths.New}`),
    isProjectContributions: useMatch(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Contributions}`),
  };

  const renderSkeleton = (variant: SkeletonVariant) => <Skeleton variant={variant} />;

  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
      {isXl && (
        <div className="flex w-full shrink-0 flex-col gap-6 bg-white/4 bg-noise-medium p-6 font-walsheim xl:w-80 xl:rounded-l-2xl">
          {renderSkeleton("projectSidebar")}
        </div>
      )}
      <div className="h-full w-full overflow-y-auto bg-space bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:rounded-r-3xl">
        <div className="h-full">
          <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 xl:px-8">
            {matches.isProjectOverview ? renderSkeleton("projectOverview") : null}
            {matches.isProjectContributors ? (
              <>
                <div className="max-w-[15%]">{renderSkeleton("counter")}</div>
                {renderSkeleton("contributorList")}
              </>
            ) : null}
            {matches.isProjectRewards ? renderSkeleton("projectRewards") : null}
            {matches.isProjectRewardForm ? renderSkeleton("projectRewardForm") : null}
            {matches.isProjectContributions ? <ContributionTableSkeleton /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
