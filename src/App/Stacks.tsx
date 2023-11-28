import { RewardSidePanelAsLeader } from "src/components/UserRewardTable/RewardSidePanel";
import ContributorProfileSidePanel from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel";
import { RegisterStack } from "src/libs/react-stack";

export enum StackRoute {
  ContributorProfile = "contributor-profile",
  Reward = "reward",
}

export interface StackRouterParams {
  ContributorProfile: {
    githubUserId: number;
  };
  Reward: {
    projectId: string;
    rewardId: string;
    onRewardCancel: () => void;
  };
}

export const Stacks = () => {
  return (
    <>
      <RegisterStack<StackRouterParams["ContributorProfile"]> name={StackRoute.ContributorProfile}>
        {({ params }) => <ContributorProfileSidePanel {...params} setOpen={() => null} />}
      </RegisterStack>
      <RegisterStack<StackRouterParams["Reward"]> name={StackRoute.Reward}>
        {({ params }) => <RewardSidePanelAsLeader {...params} />}
      </RegisterStack>
    </>
  );
};
