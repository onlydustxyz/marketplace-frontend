import { useContext } from "react";
import {
  PaymentAction__deprecated,
  ProjectDetailsActionType__deprecated,
  ProjectDetailsDispatchContext__deprecated,
} from "src/pages/ProjectDetails/ProjectDetailsContext";
import { rates } from "src/hooks/useWorkEstimation";
import { generatePath, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { ContributorsTableFieldsFragment } from "src/__generated/graphql";
import View, { Contributor } from "./View";
import { ProjectPaymentsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";

type PropsType = {
  contributors: ContributorsTableFieldsFragment[];
  isProjectLeader: boolean;
  remainingBudget: number;
  projectId: string;
};

const ContributorsTable: React.FC<PropsType> = ({
  contributors: contributorFragments,
  isProjectLeader,
  remainingBudget,
  projectId,
}) => {
  const contributors = contributorFragments.map(c => {
    const paymentRequests = c.paymentRequests?.filter(r => r.budget?.projectId === projectId) || [];

    return {
      login: c.login,
      avatarUrl: c.avatarUrl,
      isRegistered: !!c.user?.userId,
      totalEarned: paymentRequests.reduce((acc, r) => acc + r.amountInUsd || 0, 0),
      paidContributions: paymentRequests.reduce((acc, r) => acc + r.reason.work_items?.length, 0) || 0,
    };
  });

  const dispatch__deprecated = useContext(ProjectDetailsDispatchContext__deprecated);
  const navigate = useNavigate();

  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const onPaymentRequested = (contributor: Contributor) => {
    if (!isSendingNewPaymentDisabled) {
      if (sidebarUrlsEnabled) {
        navigate(
          generatePath(RoutePaths.MyProjectDetails, { projectId }) +
            "/" +
            ProjectRoutePaths.Payments +
            "/" +
            ProjectPaymentsRoutePaths.New,
          {
            state: { recipientGithubLogin: contributor.login },
          }
        );
      } else {
        dispatch__deprecated({
          type: ProjectDetailsActionType__deprecated.SelectPaymentAction,
          selectedPaymentAction: PaymentAction__deprecated.Send,
        });
        navigate(generatePath(RoutePaths.MyProjectDetails, { projectId }), {
          state: { recipientGithubLogin: contributor.login },
        });
      }
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
};

export default ContributorsTable;

export const CONTRIBUTORS_TABLE_FRAGMENT = gql`
  fragment ContributorsTableFields on User {
    id
    login
    avatarUrl
    user {
      userId
    }
    paymentRequests {
      id
      budget {
        id
        projectId
      }
      amountInUsd
      reason
    }
  }
`;
