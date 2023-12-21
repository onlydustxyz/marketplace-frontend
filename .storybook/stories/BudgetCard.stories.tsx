import { ComponentProps } from "react";
import { BudgetCard, CardTypes } from "src/_pages/ProjectDetails/Rewards/Budget/BudgetCard";
import { Currency } from "src/types";

export default {
  title: "BudgetCard",
  component: BudgetCard,
};

const mockBudget = {
  remainingBudget: {
    amount: 10000,
    currency: Currency.USD,
    usdEquivalent: 1000,
  },
  spentAmount: { amount: 5000, currency: Currency.USD, usdEquivalent: 1000 },
  sentRewards: {
    count: 10,
    total: 50,
  },
  rewardedContributorsCount: 10,
};

export const Default = {
  render: (args: ComponentProps<typeof BudgetCard>) => <BudgetCard budget={mockBudget.remainingBudget} {...args} />,
};

export const AmountSpent = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard budget={mockBudget.spentAmount} type={CardTypes.AmountSpent} {...args} />
  ),
};

export const SentRewards = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard sentRewards={mockBudget.sentRewards} type={CardTypes.RewardsSent} {...args} />
  ),
};

export const ContributorsCount = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard
      rewardedContributorsCount={mockBudget.rewardedContributorsCount}
      type={CardTypes.Contributors}
      {...args}
    />
  ),
};
