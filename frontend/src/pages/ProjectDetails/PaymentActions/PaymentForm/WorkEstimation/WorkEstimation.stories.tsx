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

Default.args = {
  onChange: () => {
    return;
  },
  budget: { initialAmount: 50000, remainingAmount: 30000 },
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
