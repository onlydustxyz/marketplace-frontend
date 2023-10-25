import { StoryFn } from "@storybook/react";
import { RewardDetailPanelProvider } from "src/hooks/useRewardDetailPanel";

export default function withRewardDetailPanelProvider(Story: StoryFn) {
  return (
    <RewardDetailPanelProvider>
      <Story />
    </RewardDetailPanelProvider>
  );
}
