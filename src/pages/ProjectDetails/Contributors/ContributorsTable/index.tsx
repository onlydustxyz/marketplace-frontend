import { rates } from "src/hooks/useWorkEstimation";
import { generatePath, useNavigate } from "react-router-dom";
import View, { Contributor } from "./View";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { ContributorFragment } from "src/__generated/graphql";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { ViewMobile } from "./ViewMobile";
import { ContributorT } from "src/types";

type Props = {
  contributors: ContributorT[];
  isProjectLeader: boolean;
  remainingBudget: number;
  projectKey: string;
};

export default function ContributorsTable({ contributors, isProjectLeader, remainingBudget, projectKey }: Props) {
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
        isProjectLeader,
        remainingBudget,
        onRewardGranted: onPaymentRequested,
      }}
    />
  ) : (
    <ViewMobile isProjectLeader={isProjectLeader} contributors={contributors} />
  );
}
