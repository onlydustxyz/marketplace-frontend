import { ComponentStory, ComponentMeta } from "@storybook/react";

import InfoMissingBanner from ".";

export default {
  title: "InfoMissingBanner",
  component: InfoMissingBanner,
} as ComponentMeta<typeof InfoMissingBanner>;

const Template: ComponentStory<typeof InfoMissingBanner> = () => <InfoMissingBanner />;

export const Default = Template.bind({});

Default.args = {}; // put your component's args for the Default story here
