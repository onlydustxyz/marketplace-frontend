import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import OnlyDustLogo from ".";

export default {
  title: "OnlyDustLogo",
  component: OnlyDustLogo,
  decorators: [withRouter],
} as ComponentMeta<typeof OnlyDustLogo>;

const Template: ComponentStory<typeof OnlyDustLogo> = () => <OnlyDustLogo />;

export const Default = Template.bind({});
