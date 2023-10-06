import { ComponentStory, ComponentMeta } from "@storybook/react";

import OnlyDustLogo from "src/components/App/Layout/Header/OnlyDustLogo";

export default {
  title: "OnlyDustLogo",
  component: OnlyDustLogo,
} as ComponentMeta<typeof OnlyDustLogo>;

const Template: ComponentStory<typeof OnlyDustLogo> = () => <OnlyDustLogo />;

export const Default = Template.bind({});
