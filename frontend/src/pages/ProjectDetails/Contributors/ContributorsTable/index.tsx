import { rates } from "src/hooks/useWorkEstimation";
import { generatePath, useNavigate } from "react-router-dom";
import View, { Contributor } from "./View";
import { ProjectPaymentsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { GithubUserWithPaymentRequestsForProjectFragment } from "src/__generated/graphql";

type Props = {
  contributors: (GithubUserWithPaymentRequestsForProjectFragment & { unpaidMergedPullsCount?: number })[];
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
    return {
      id: c.id,
      login: c.login,
      avatarUrl: c.avatarUrl,
      htmlUrl: c.htmlUrl,
      isRegistered: !!c.user?.id,
      totalEarned: c.paymentRequests.reduce((acc, r) => acc + r.amountInUsd || 0, 0),
      paidContributions:
        c.paymentRequests.reduce((acc, r) => acc + (r.workItemsAggregate.aggregate?.count || 0), 0) || 0,
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
