import { ComponentProps } from "react";
import { ProjectBudgetType, RemainingBudget } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";

const mockBudgets: ProjectBudgetType = {
  initialDollarsEquivalent: 10000000,
  remainingDollarsEquivalent: 5007500,
  budgets: [
    {
      currency: "USD",
      initialAmount: 10000000,
      remaining: 5007500,
      remainingDollarsEquivalent: 5007500,
      initialDollarsEquivalent: 10000000,
    },
  ],
};

const mockBudgetsWithEther: ProjectBudgetType = {
  initialDollarsEquivalent: 120000,
  remainingDollarsEquivalent: 86000,
  budgets: [
    {
      currency: "USD",
      initialAmount: 1200,
      remaining: 860,
      remainingDollarsEquivalent: 5007500,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "STARK",
      initialAmount: 100,
      remaining: 72,
      remainingDollarsEquivalent: 9987500,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "OP",
      initialAmount: 120000,
      remaining: 86000,
      remainingDollarsEquivalent: 86000,
      initialDollarsEquivalent: 10000,
    },
  ],
};

export default {
  title: "RemainingBudget",
  component: RemainingBudget,
};

const defaultProps: ComponentProps<typeof RemainingBudget> = {
  projectBudget: mockBudgets,
};

const ethereumProps: ComponentProps<typeof RemainingBudget> = {
  projectBudget: mockBudgetsWithEther,
};

export const Default = {
  render: (args: ComponentProps<typeof RemainingBudget>) => <RemainingBudget {...defaultProps} {...args} />,
};

export const Cryptos = {
  render: (args: ComponentProps<typeof RemainingBudget>) => <RemainingBudget {...ethereumProps} {...args} />,
};
