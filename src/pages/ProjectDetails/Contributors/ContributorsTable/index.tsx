import { ComponentProps } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import View from "./View";
import { ViewMobile } from "./ViewMobile";

type Props<C> = {
  contributors: C[];
  projectKey: string;
  rewardDisableReason?: ComponentProps<typeof View>["rewardDisableReason"];
} & Omit<ComponentProps<typeof View>, "contributors" | "onRewardGranted">;

export default function ContributorsTable<C extends components["schemas"]["ContributorPageItemResponse"]>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  projectKey,
  sorting,
  sortField,
  rewardDisableReason,
}: Props<C>) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const navigate = useNavigate();

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
      }}
    />
  );
}
