import { StoryFn } from "@storybook/react";
import { ContributionDetailPanelProvider } from "src/hooks/useContributionDetailPanel";

export default function withContributionDetailPanelProvider(Story: StoryFn) {
  return (
    <ContributionDetailPanelProvider>
      <Story />
    </ContributionDetailPanelProvider>
  );
}
