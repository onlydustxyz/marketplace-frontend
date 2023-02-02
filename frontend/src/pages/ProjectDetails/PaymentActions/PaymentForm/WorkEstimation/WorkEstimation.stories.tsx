import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Steps } from "src/hooks/useWorkEstimation";

import WorkEstimation from "./View";

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
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  disabled: false,
  canIncrease: true,
  canDecrease: true,
  amountToPay: 1000,
  stepNumber: 3,
  steps: Steps.Days,
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
