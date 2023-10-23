import { rates } from "src/hooks/useWorkEstimation";
import { generatePath, useNavigate } from "react-router-dom";
import View from "./View";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { ViewMobile } from "./ViewMobile";
import { ContributorT } from "src/types";
import { Field, Sorting } from "..";

type Props = {
  contributors: ContributorT[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  remainingBudget: number;
  projectKey: string;
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
};

export default function ContributorsTable({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  projectKey,
  sorting,
  applySorting,
}: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const navigate = useNavigate();

  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const onPaymentRequested = (contributor: ContributorT) => {
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
        onRewardGranted: onPaymentRequested,
        sorting,
        applySorting,
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
