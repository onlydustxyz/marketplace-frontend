import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import RemainingBudget from ".";

export default {
  title: "RemainingBudget",
  component: RemainingBudget,
  decorators: [withRouter],
} as ComponentMeta<typeof RemainingBudget>;

const Template: ComponentStory<typeof RemainingBudget> = args => <RemainingBudget {...args} />;

export const Default = Template.bind({});

Default.args = {
  budget: { initialAmount: 150000, remainingAmount: 89000 },
  disabled: false,
};
