import { ContributionDetail } from "src/components/ContributionDetail/ContributionDetail";
import RewardSidePanel, { RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";
import { RegisterStack } from "src/libs/react-stack";

export enum StackRoute {
  ContributorProfile = "contributor-profile",
  ProjectReward = "project-reward",
  MyReward = "my-reward",
  Contribution = "contribution",
}

export interface StackRouterParams {
  ContributorProfile: {
    githubUserId: number;
  };
  ProjectReward: {
    projectId: string;
    rewardId: string;
    onRewardCancel: () => void;
  };
  MyReward: {
    rewardId: string;
  };
  Contribution: {
    contributionId: string;
    projectId: string;
    githubHtmlUrl: string;
  };
}

export const Stacks = () => {
  return (
    <>
      <RegisterStack<StackRouterParams["ContributorProfile"]> name={StackRoute.ContributorProfile}>
        {({ params }) => <ContributorProfileSidePanel {...params} setOpen={() => null} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["ProjectReward"]> name={StackRoute.ProjectReward}>
        {({ params }) => <RewardSidePanelAsLeader {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["MyReward"]> name={StackRoute.MyReward}>
        {({ params }) => <RewardSidePanel isMine {...params} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["Contribution"]> name={StackRoute.Contribution}>
        {({ params }) => <ContributionDetail {...params} />}
      </RegisterStack>
    </>
  );
};
