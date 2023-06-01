import { StoryFn } from "@storybook/react";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";

export default function withSidePanelStackProvider(Story: StoryFn) {
  return (
    <SidePanelStackProvider>
      <Story />
    </SidePanelStackProvider>
  );
}
