import RewardSidePanel, { RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";
import { RegisterStack } from "src/libs/react-stack";

export enum StackRoute {
  ContributorProfile = "contributor-profile",
  ProjectReward = "project-reward",
  MyReward = "my-reward",
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
    </>
  );
};
