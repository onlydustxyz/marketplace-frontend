import { ComponentProps } from "react";
import { BudgetCard } from "src/pages/ProjectDetails/Rewards/RemainingBudget/BudgetCard";
import { TotalBudgetCard } from "src/pages/ProjectDetails/Rewards/RemainingBudget/TotalBudgetCard";
import { Currency } from "src/types";

export default {
  title: "BudgetCard",
  component: BudgetCard,
};

const totalBudget: ComponentProps<typeof TotalBudgetCard> = {
  budget: { initialAmount: 150000, remaining: 89000 },
};

const otherBudgets: ComponentProps<typeof BudgetCard> = {
  budget: { initialAmount: 1200, remaining: 1000, initialDollarsEquivalent: 50000, currency: Currency.USD },
};

export const Default = {
  render: (args: ComponentProps<typeof BudgetCard>) => <TotalBudgetCard {...totalBudget} {...args} />,
};

export const Dollars = {
  render: (args: ComponentProps<typeof BudgetCard>) => <BudgetCard {...otherBudgets} {...args} />,
};

export const Ether = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard {...{ otherBudgets, budget: { ...otherBudgets.budget, currency: Currency.ETH } }} {...args} />
  ),
};

export const Stark = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard {...{ otherBudgets, budget: { ...otherBudgets.budget, currency: Currency.STARK } }} {...args} />
  ),
};

export const Aptos = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard {...{ otherBudgets, budget: { ...otherBudgets.budget, currency: Currency.APT } }} {...args} />
  ),
};

export const Optimism = {
  render: (args: ComponentProps<typeof BudgetCard>) => (
    <BudgetCard {...{ otherBudgets, budget: { ...otherBudgets.budget, currency: Currency.OP } }} {...args} />
  ),
};
