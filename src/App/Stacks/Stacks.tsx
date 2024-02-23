"use client";

import { ComponentProps } from "react";

import { ContributionDetail } from "src/App/Stacks/ContributionDetail/ContributionDetail";
import ContributorProfileSidePanel from "src/App/Stacks/ContributorProfileSidePanel";
import { FeedbackPanel } from "src/App/Stacks/FeedbackPanel/FeedbackPanel";
import RewardSidePanel, { RewardSidePanelAsLeader } from "src/App/Stacks/RewardSidePanel";
import { VerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import EyeLine from "src/icons/EyeLine";
import GithubLogo from "src/icons/GithubLogo";
import { RegisterStack, useCloseAllStack, useStackNavigation } from "src/libs/react-stack";
import { StacksParams } from "src/libs/react-stack/types/Stack";

import { BillingCreateStack } from "components/features/stacks/billing-create-stack/billing-create-stack";
import { TBillingCreateStack } from "components/features/stacks/billing-create-stack/billing-create-stack.types";
import { BillingInviteTeamMember } from "components/features/stacks/billing-invite-team-member/billing-invite-team-member";
import { TBillingInviteTeamMember } from "components/features/stacks/billing-invite-team-member/billing-invite-team-member.types";
import { MandateDetailStack } from "components/features/stacks/payments-flow/mandate-detail-stack/mandate-detail-stack";
import { RequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import ClaimSidePanel from "./GithubWorkflow/ClaimSidePanel/ClaimSidePanel";
import TutorialSidePanel from "./GithubWorkflow/TutorialSidePanel/TutorialSidePanel";
import { ProjectOverviewSidePanel } from "./ProjectOverviewSidePanel/ProjectOverviewSidePanel";

export enum StackRoute {
  ContributorProfile = "contributor-profile",
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
  ContributorProfile: {
    githubUserId: number;
  };
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
  Verify: ComponentProps<typeof VerifySidePanel>;
}

export const Stacks = () => {
  return (
    <>
      <RegisterStack<StackRouterParams["ContributorProfile"]>
        name={StackRoute.ContributorProfile}
        option={{ panel: { noPadding: true } }}
      >
        {({ params }) => <ContributorProfileSidePanel {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["ProjectLeaderReward"]> name={StackRoute.ProjectLeaderReward}>
        {({ params }) => <RewardSidePanelAsLeader {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["Reward"]> name={StackRoute.Reward}>
        {({ params }) => <RewardSidePanel {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["Contribution"]> name={StackRoute.Contribution}>
        {({ params }) => <ContributionDetail {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["GithubWorkflowClaim"]> name={StackRoute.GithubWorkflowClaim}>
        {({ params }) => <ClaimSidePanel {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["ProjectOverview"]> name={StackRoute.ProjectOverview}>
        {({ params }) => <ProjectOverviewSidePanel {...params} />}
      </RegisterStack>
      <RegisterStack name={StackRoute.GithubWorkflowTutorial}>{() => <TutorialSidePanel />}</RegisterStack>
      <RegisterStack<TBillingCreateStack.Props> name={StackRoute.BillingCreate}>
        {() => <BillingCreateStack />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["Verify"]>
        name={StackRoute.Verify}
        option={{
          panel: {
            theme: "light",
          },
        }}
      >
        {({ params }) => <VerifySidePanel {...params} />}
      </RegisterStack>
      <RegisterStack name={StackRoute.RequestPayments}>{() => <RequestPaymentsStacks />}</RegisterStack>
      <RegisterStack name={StackRoute.Feedback}>{() => <FeedbackPanel />}</RegisterStack>
      <RegisterStack<TBillingInviteTeamMember.Props> name={StackRoute.BillingInviteTeamMember}>
        {({ params }) => <BillingInviteTeamMember {...params} />}
      </RegisterStack>
      <RegisterStack name={StackRoute.MandateDetail}>{() => <MandateDetailStack />}</RegisterStack>
    </>
  );
};

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

export const useStackContributorProfile = () => {
  return useStackNavigation<StackRouterParams["ContributorProfile"]>(StackRoute.ContributorProfile);
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
  return useStackNavigation(StackRoute.BillingCreate);
};

export const useStackBillingInviteTeamMember = () => {
  return useStackNavigation<TBillingInviteTeamMember.Props>(StackRoute.BillingInviteTeamMember);
};

export const useStackRequestPayments = () => {
  return useStackNavigation(StackRoute.RequestPayments);
};
