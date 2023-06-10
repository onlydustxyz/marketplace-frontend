/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { CommandsProvider } from "src/providers/Commands";

export default function withCommandProvider(Story: StoryFn) {
  return (
    <CommandsProvider>
      <Story />
    </CommandsProvider>
  );
}
