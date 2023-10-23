import { StoryFn } from "@storybook/react";
import { ContributionDetailPanelProvider } from "src/hooks/useContributionDetailPanel";

export default function withRewardDetailPanelProvider(Story: StoryFn) {
  return (
    <ContributionDetailPanelProvider>
      <Story />
    </ContributionDetailPanelProvider>
  );
}
