import { ComponentStory, ComponentMeta } from "@storybook/react";

import EstimationComponent from ".";

export default {
  title: "EstimationComponent",
  component: EstimationComponent,
} as ComponentMeta<typeof EstimationComponent>;

const Template: ComponentStory<typeof EstimationComponent> = args => <EstimationComponent {...args} />;

export const Default = Template.bind({});

Default.args = {
  numberOfDays: 2,
  decreaseNumberOfDays: () => {
    return;
  },
  increaseNumberOfDays: () => {
    return;
  },
  budget: { initialAmount: 50000, remainingAmount: 30000 },
};
