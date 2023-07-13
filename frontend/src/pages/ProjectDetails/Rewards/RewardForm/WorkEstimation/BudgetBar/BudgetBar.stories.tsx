import { ComponentStory, ComponentMeta } from "@storybook/react";

import BudgetBar from ".";

export default {
  title: "BudgetBar",
  component: BudgetBar,
} as ComponentMeta<typeof BudgetBar>;

const Template: ComponentStory<typeof BudgetBar> = args => (
  <div className="w-96">
    <BudgetBar {...args} />
  </div>
);

export const Default = Template.bind({});
export const NoBudget = Template.bind({});

Default.args = {
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  pendingSpending: 1000,
  displayPendingSpending: true,
};

NoBudget.args = {
  budget: { initialAmount: 5000, remainingAmount: 0 },
  pendingSpending: 1000,
  displayPendingSpending: true,
};
