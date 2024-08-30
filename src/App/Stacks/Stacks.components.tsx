"use client";

import dynamic from "next/dynamic";

import { StackRoute, StackRouterParams } from "src/App/Stacks/Stacks";
import { RegisterStack } from "src/libs/react-stack";

import { TBillingCreateStack } from "components/features/stacks/billing-create-stack/billing-create-stack.types";
import { TBillingInviteTeamMember } from "components/features/stacks/billing-invite-team-member/billing-invite-team-member.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

const BillingCreateStack = dynamic(
  () =>
    import("components/features/stacks/billing-create-stack/billing-create-stack").then(res => res.BillingCreateStack),
  { ssr: false }
);
const ContributionDetail = dynamic(
  () => import("src/App/Stacks/ContributionDetail/ContributionDetail").then(res => res.ContributionDetail),
  { ssr: false }
);
const FeedbackPanel = dynamic(
  () => import("src/App/Stacks/FeedbackPanel/FeedbackPanel").then(res => res.FeedbackPanel),
  { ssr: false }
);
const RewardSidePanel = dynamic(() => import("src/App/Stacks/RewardSidePanel").then(res => res.default), {
  ssr: false,
});
const RewardSidePanelAsLeader = dynamic(
  () => import("src/App/Stacks/RewardSidePanel").then(res => res.RewardSidePanelAsLeader),
  { ssr: false }
);
const VerifySidePanel = dynamic(
  () => import("src/App/Stacks/VerifySidePanel/VerifySidePanel").then(res => res.VerifySidePanel),
  { ssr: false }
);
const BillingInviteTeamMember = dynamic(
  () =>
    import("components/features/stacks/billing-invite-team-member/billing-invite-team-member").then(
      res => res.BillingInviteTeamMember
    ),
  { ssr: false }
);
const MandateDetailStack = dynamic(
  () =>
    import("components/features/stacks/payments-flow/mandate-detail-stack/mandate-detail-stack").then(
      res => res.MandateDetailStack
    ),
  { ssr: false }
);
const RequestPaymentsStacks = dynamic(
  () =>
    import("components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks").then(
      res => res.RequestPaymentsStacks
    ),
  { ssr: false }
);
const ClaimSidePanel = dynamic(
  () => import("./GithubWorkflow/ClaimSidePanel/ClaimSidePanel").then(res => res.default),
  { ssr: false }
);
const TutorialSidePanel = dynamic(
  () => import("./GithubWorkflow/TutorialSidePanel/TutorialSidePanel").then(res => res.default),
  { ssr: false }
);
const ProjectOverviewSidePanel = dynamic(
  () => import("./ProjectOverviewSidePanel/ProjectOverviewSidePanel").then(res => res.ProjectOverviewSidePanel),
  { ssr: false }
);

export const Stacks = () => {
  return (
    <>
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
        {({ params }) => <BillingCreateStack {...params} />}
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
      <RegisterStack<TRequestPaymentsStacks.Props> name={StackRoute.RequestPayments}>
        {({ params }) => <RequestPaymentsStacks {...params} />}
      </RegisterStack>
      <RegisterStack name={StackRoute.Feedback}>{() => <FeedbackPanel />}</RegisterStack>
      <RegisterStack<TBillingInviteTeamMember.Props> name={StackRoute.BillingInviteTeamMember}>
        {({ params }) => <BillingInviteTeamMember {...params} />}
      </RegisterStack>
      <RegisterStack name={StackRoute.MandateDetail}>{() => <MandateDetailStack />}</RegisterStack>
    </>
  );
};
