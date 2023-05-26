import { StoryFn } from "@storybook/react";
import { ToasterProvider } from "src/hooks/useToaster";

export default function withToasterProvider(Story: StoryFn) {
  return (
    <ToasterProvider>
      <Story />
    </ToasterProvider>
  );
}
