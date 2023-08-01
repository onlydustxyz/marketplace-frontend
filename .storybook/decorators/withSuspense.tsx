/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { Suspense } from "react";

export default function withSuspense(Story: StoryFn) {
  return (
    <Suspense>
      <Story />
    </Suspense>
  );
}
