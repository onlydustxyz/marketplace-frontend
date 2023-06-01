import { StoryFn } from "@storybook/react";
import { ContributorProfilePanelProvider } from "src/hooks/useContributorProfilePanel";

export default function withContributorProfilePanelProvider(Story: StoryFn) {
  return (
    <ContributorProfilePanelProvider>
      <Story />
    </ContributorProfilePanelProvider>
  );
}
