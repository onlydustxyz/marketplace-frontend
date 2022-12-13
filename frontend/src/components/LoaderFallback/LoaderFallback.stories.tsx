import { ComponentStory, ComponentMeta } from "@storybook/react";

import LoaderFallback from ".";

export default {
  title: "LoaderFallback",
  component: LoaderFallback,
} as ComponentMeta<typeof LoaderFallback>;

const Template: ComponentStory<typeof LoaderFallback> = () => <LoaderFallback />;

export const Default = Template.bind({});
