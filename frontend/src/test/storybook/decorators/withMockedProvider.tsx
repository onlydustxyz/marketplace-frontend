/* eslint-disable react/display-name */
import { SuspenseCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { StoryFn } from "@storybook/react";

const suspenseCache = new SuspenseCache();

export default function withMockedProvider(mocks?: MockedResponse[]) {
  return (Story: StoryFn) => (
    <MockedProvider mocks={mocks} suspenseCache={suspenseCache}>
      <Story />
    </MockedProvider>
  );
}
