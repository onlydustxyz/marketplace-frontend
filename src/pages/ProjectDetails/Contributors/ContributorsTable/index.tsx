import { ComponentProps } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import { viewportConfig } from "src/config";
import { rates } from "src/hooks/useWorkEstimation";
import { useMediaQuery } from "usehooks-ts";
import View from "./View";
import { ViewMobile } from "./ViewMobile";

type Props<C> = {
  contributors: C[];
  projectKey: string;
} & Omit<ComponentProps<typeof View>, "contributors" | "onRewardGranted">;

export default function ContributorsTable<C extends components["schemas"]["ContributorPageItemResponse"]>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  projectKey,
  sorting,
  sortField,
}: Props<C>) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const navigate = useNavigate();

  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const onRewardGranted = (contributor: C) => {
    if (!isSendingNewPaymentDisabled) {
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
    }
  };

  return isXl ? (
    <View
      {...{
        contributors,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isProjectLeader,
        remainingBudget,
        onRewardGranted,
        sorting,
        sortField,
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
