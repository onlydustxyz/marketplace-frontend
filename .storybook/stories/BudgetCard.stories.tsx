import { ComponentProps } from "react";
import { Money } from "utils/Money/Money";

import { BudgetCard, CardTypes } from "src/_pages/ProjectDetails/Rewards/Budget/BudgetCard";

export default {
  title: "BudgetCard",
  component: BudgetCard,
};

const mockBudget = {
  remainingBudget: {
    totalUsdEquivalent: 10000,
    totalPerCurrency: [
      {
        amount: 10000,
        prettyAmount: 10000,
        currency: Money.fromSchema({ code: Money.Static.Currency.USD }),
        usdEquivalent: 1000,
      },
    ],
  },
  spentAmount: {
    totalUsdEquivalent: 5000,
    totalPerCurrency: [
      {
        amount: 5000,
        prettyAmount: 5000,
        currency: Money.fromSchema({ code: Money.Static.Currency.USD }),
        usdEquivalent: 1000,
      },
    ],
  },
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
