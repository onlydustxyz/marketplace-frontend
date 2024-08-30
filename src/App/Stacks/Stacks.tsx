"use client";

import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import EyeLine from "src/icons/EyeLine";
import GithubLogo from "src/icons/GithubLogo";
import { useCloseAllStack, useStackNavigation } from "src/libs/react-stack";
import { StacksParams } from "src/libs/react-stack/types/Stack";

import { TBillingCreateStack } from "components/features/stacks/billing-create-stack/billing-create-stack.types";
import { TBillingInviteTeamMember } from "components/features/stacks/billing-invite-team-member/billing-invite-team-member.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export enum StackRoute {
  ProjectOverview = "project-overview",
  ProjectLeaderReward = "project-leader-reward",
  Reward = "reward",
  Contribution = "contribution",
  GithubWorkflowClaim = "github-workflow-claim",
  GithubWorkflowTutorial = "github-workflow-tutorial",
  Verify = "verify",
  BillingCreate = "billing-create",
  RequestPayments = "request-payments",
  Feedback = "feedback",
  BillingInviteTeamMember = "billing-invite-team-member",
  MandateDetail = "mandate-detail",
}
export interface StackRouterParams {
  ProjectOverview: {
    slug: string;
  } & StacksParams;
  ProjectLeaderReward: {
    projectId: string;
    rewardId: string;
    onRewardCancel: () => void;
  };
  Reward: {
    rewardId: string;
    projectId: string;
    isMine?: true;
  };
  Contribution: {
    contributionId: string;
    projectId: string;
    githubHtmlUrl: string;
  } & StacksParams;
  GithubWorkflowClaim: {
    projectSlug: string;
  };
  Verify: TVerifySidePanel.Props;
}

export const useStackMandate = () => {
  return useStackNavigation(StackRoute.MandateDetail);
};

export const useStackFeedback = () => {
  return useStackNavigation(StackRoute.Feedback);
};

export const useStackVerify = () => {
  return useStackNavigation(StackRoute.Verify);
};

export const useStackProjecRewardAsLead = () => {
  return useStackNavigation<StackRouterParams["ProjectLeaderReward"]>(StackRoute.ProjectLeaderReward);
};

export const useStackContribution = (): [
  ({ projectId, contributionId, githubHtmlUrl }: Omit<StackRouterParams["Contribution"], "panelProps">) => void,
  (id?: string | undefined) => void
] => {
  const { T } = useIntl();
  const [open, close] = useStackNavigation<StackRouterParams["Contribution"]>(StackRoute.Contribution);

  const handleOpen = ({
    projectId,
    contributionId,
    githubHtmlUrl,
  }: Omit<StackRouterParams["Contribution"], "panelProps">) => {
    open({
      contributionId,
      projectId,
      githubHtmlUrl,
      panelProps: {
        action: (
          <a href={githubHtmlUrl} target="_blank" rel="noreferrer">
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary}>
              <GithubLogo className="text-base leading-none" />
              {T("contributions.panel.githubLink")}
            </Button>
          </a>
        ),
      },
    });
  };
  return [handleOpen, close];
};

export const useStackReward = () => {
  return useStackNavigation<StackRouterParams["Reward"]>(StackRoute.Reward);
};

export const useStackGithubWorkflowClaim = () => {
  return useStackNavigation<StackRouterParams["GithubWorkflowClaim"]>(StackRoute.GithubWorkflowClaim);
};

export const useStackGithubWorkflowTutorial = () => {
  return useStackNavigation(StackRoute.GithubWorkflowTutorial);
};

export const useStackProjectOverview = (): [
  ({ slug }: Omit<StackRouterParams["ProjectOverview"], "panelProps">) => void,
  (id?: string | undefined) => void
] => {
  const { T } = useIntl();
  const closeAll = useCloseAllStack();
  const [open, close] = useStackNavigation<StackRouterParams["ProjectOverview"]>(StackRoute.ProjectOverview);

  const handleOpen = ({ slug }: Omit<StackRouterParams["ProjectOverview"], "panelProps">) => {
    open({
      slug,
      panelProps: {
        action: (
          <BaseLink
            href={NEXT_ROUTER.projects.details.root(slug)}
            className="hover:underline"
            onClick={() => closeAll()}
          >
            <Button size={ButtonSize.Sm} type={ButtonType.Primary}>
              <EyeLine className="text-base leading-none" />
              {T("project.openOverview")}
            </Button>
          </BaseLink>
        ),
      },
    });
  };
  return [handleOpen, close];
};

export const useStackBillingCreate = () => {
  return useStackNavigation<TBillingCreateStack.Props>(StackRoute.BillingCreate);
};

export const useStackBillingInviteTeamMember = () => {
  return useStackNavigation<TBillingInviteTeamMember.Props>(StackRoute.BillingInviteTeamMember);
};

export const useStackRequestPayments = () => {
  return useStackNavigation<TRequestPaymentsStacks.Props>(StackRoute.RequestPayments);
};
