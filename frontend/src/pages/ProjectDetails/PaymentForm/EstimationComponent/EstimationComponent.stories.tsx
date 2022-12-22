import { ComponentStory, ComponentMeta } from "@storybook/react";

import EstimationComponent from ".";

export default {
  title: "EstimationComponent",
  component: EstimationComponent,
} as ComponentMeta<typeof EstimationComponent>;

const Template: ComponentStory<typeof EstimationComponent> = args => <EstimationComponent {...args} />;

export const Default = Template.bind({});

let numberOfDays = 2;

Default.args = {
  numberOfDays,
  subtractNumberOfDays: () => numberOfDays--,
  increaseNumberOfDays: () => numberOfDays++,
  budget: { total: 50000, remaining: 30000 },
};
