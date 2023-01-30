import { ComponentStory, ComponentMeta } from "@storybook/react";

import WorkEstimation from ".";

export default {
  title: "WorkEstimation",
  component: WorkEstimation,
} as ComponentMeta<typeof WorkEstimation>;

const Template: ComponentStory<typeof WorkEstimation> = args => (
  <div className="w-96">
    <WorkEstimation {...args} />
  </div>
);

export const Default = Template.bind({});
export const NoBudget = Template.bind({});

Default.args = {
  onChange: () => {
    return;
  },
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  disabled: false,
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};

NoBudget.args = {
  onChange: () => {
    return;
  },
  budget: { initialAmount: 5000, remainingAmount: 0 },
  disabled: false,
};

NoBudget.parameters = {
  backgrounds: {
    default: "space",
  },
};
