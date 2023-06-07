import { StoryFn } from "@storybook/react";
import { Toaster } from "src/components/Toaster";
import { ToasterProvider } from "src/hooks/useToaster";

export default function withToasterProvider(Story: StoryFn) {
  return (
    <ToasterProvider>
      <Story />
      <Toaster />
    </ToasterProvider>
  );
}
