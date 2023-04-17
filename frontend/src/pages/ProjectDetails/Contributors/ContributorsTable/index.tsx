import { rates } from "src/hooks/useWorkEstimation";
import { generatePath, useNavigate } from "react-router-dom";
import { ContributorsTableFieldsFragment } from "src/__generated/graphql";
import View, { Contributor } from "./View";
import { ProjectPaymentsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";

type Props = {
  contributors: (ContributorsTableFieldsFragment & { unpaidMergedPullsCount?: number })[];
  isProjectLeader: boolean;
  remainingBudget: number;
  projectId: string;
};

export default function ContributorsTable({
  contributors: contributorFragments,
  isProjectLeader,
  remainingBudget,
  projectId,
}: Props) {
  const contributors = contributorFragments.map(c => {
    const paymentRequests = c.paymentRequests?.filter(r => r.budget?.projectId === projectId) || [];

    return {
      login: c.login,
      avatarUrl: c.avatarUrl,
      htmlUrl: c.htmlUrl,
      isRegistered: !!c.user?.userId,
      totalEarned: paymentRequests.reduce((acc, r) => acc + r.amountInUsd || 0, 0),
      paidContributions: paymentRequests.reduce((acc, r) => acc + r.workItems?.length, 0) || 0,
      unpaidMergedPullsCount: c.unpaidMergedPullsCount,
    };
  });

  const navigate = useNavigate();

  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const onPaymentRequested = (contributor: Contributor) => {
    if (!isSendingNewPaymentDisabled) {
      navigate(
        generatePath(RoutePaths.ProjectDetails, { projectId }) +
          "/" +
          ProjectRoutePaths.Payments +
          "/" +
          ProjectPaymentsRoutePaths.New,
        {
          state: { recipientGithubLogin: contributor.login },
        }
      );
    }
  };

  return (
    <View
      {...{
        contributors,
        isProjectLeader,
        remainingBudget,
        onPaymentRequested,
      }}
    />
  );
}
