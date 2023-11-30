import { ContributionDetail } from "src/components/ContributionDetail/ContributionDetail";
import RewardSidePanel, { RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";
import { RegisterStack, useStackNavigation } from "src/libs/react-stack";
import { StacksParams } from "src/libs/react-stack/types/Stack";

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
  } & StacksParams;
}

export const Stacks = () => {
  return (
    <>
      <RegisterStack<StackRouterParams["ContributorProfile"]> name={StackRoute.ContributorProfile}>
        {({ params }) => <ContributorProfileSidePanel {...params} />}
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

export const useStackProjectReward = () => {
  return useStackNavigation<StackRouterParams["ProjectReward"]>(StackRoute.ProjectReward);
};

export const useStackContribution = () => {
  return useStackNavigation<StackRouterParams["Contribution"]>(StackRoute.Contribution);
};

export const useStackMyReward = () => {
  return useStackNavigation<StackRouterParams["MyReward"]>(StackRoute.MyReward);
};

export const useStackContributorProfile = () => {
  return useStackNavigation<StackRouterParams["ContributorProfile"]>(StackRoute.ContributorProfile);
};
