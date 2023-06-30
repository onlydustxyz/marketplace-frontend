import { StoryFn } from "@storybook/react";
import { SidePanelProvider } from "src/hooks/useSidePanel";

export default function withSidePanelProvider(Story: StoryFn) {
  return (
    <SidePanelProvider>
      <Story />
    </SidePanelProvider>
  );
}
