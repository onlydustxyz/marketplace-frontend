import { ComponentProps } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { useToggleContributor } from "src/_pages/ProjectDetails/Contributors/ContributorsTable/useToggleContributor";
import { ProjectContributorItem } from "src/api/Project/queries";
import { viewportConfig } from "src/config";

import View from "./View";
import { ViewMobile } from "./ViewMobile";

type Props<C> = {
  contributors: C[];
  projectKey: string;
  projectId: string;
  rewardDisableReason?: ComponentProps<typeof View>["rewardDisableReason"];
} & Omit<ComponentProps<typeof View>, "contributors" | "onRewardGranted" | "onToggleContributor">;

export default function ContributorsTable<C extends ProjectContributorItem>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  projectKey,
  projectId,
  sorting,
  sortField,
  rewardDisableReason,
}: Props<C>) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const navigate = useNavigate();
  const { onToggleContributor } = useToggleContributor({ projectId });

  const onRewardGranted = (contributor: C) => {
    navigate(
      generatePath(RoutePaths.ProjectDetails, { projectKey }) +
        "/" +
        ProjectRoutePaths.Rewards +
        "/" +
        ProjectRewardsRoutePaths.New,
      {
        state: { recipientGithubLogin: contributor.login },
      }
    );
  };

  return isXl ? (
    <View
      {...{
        contributors,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isProjectLeader,
        onRewardGranted,
        onToggleContributor,
        sorting,
        sortField,
        rewardDisableReason,
      }}
    />
  ) : (
    <ViewMobile
      {...{
        contributors,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isProjectLeader,
        onRewardGranted,
        onToggleContributor,
      }}
    />
  );
}
