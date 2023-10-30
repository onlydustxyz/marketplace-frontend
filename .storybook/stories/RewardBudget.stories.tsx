import { ComponentProps } from "react";
import { RewardBudget } from "src/components/RewardBudget/RewardBudget";
import Tooltip from "src/components/Tooltip";

export default {
  title: "RewardBudget",
  component: RewardBudget,
  parameters: {
    backgrounds: {
      default: "rewards-page",
      values: [{ name: "rewards-page", value: "#0B0D20" }],
    },
  },
};

const defaultProps: ComponentProps<typeof RewardBudget> = {
  budgets: [
    {
      currency: "APT",
      initialAmount: 20,
      initialDollarsEquivalent: 2000,
      dollarsConversionRate: 100,
      remaining: 10,
      remainingDollarsEquivalent: 1000,
    },
    {
      currency: "ETH",
      initialAmount: 10,
      initialDollarsEquivalent: 2000,
      remaining: 5,
      dollarsConversionRate: 2000,
      remainingDollarsEquivalent: 1000,
    },
    {
      currency: "USD",
      initialAmount: 2000,
      remaining: 1000,
      remainingDollarsEquivalent: 1000,
      initialDollarsEquivalent: 2000,
    },
    {
      currency: "OP",
      initialAmount: 10,
      initialDollarsEquivalent: 2000,
      remaining: 5,
      dollarsConversionRate: 2000,
      remainingDollarsEquivalent: 1000,
    },
    {
      currency: "STARK",
      initialAmount: 10,
      remaining: 5,
      remainingDollarsEquivalent: undefined,
      initialDollarsEquivalent: undefined,
    },
  ],
};

const With0RemainingCurrencyCurrencyProps: ComponentProps<typeof RewardBudget> = {
  budgets: [
    {
      currency: "APT",
      initialAmount: 20,
      initialDollarsEquivalent: 2000,
      dollarsConversionRate: 100,
      remaining: 10,
      remainingDollarsEquivalent: 1000,
    },
    {
      currency: "ETH",
      initialAmount: 10,
      initialDollarsEquivalent: 2000,
      remaining: 5,
      dollarsConversionRate: 2000,
      remainingDollarsEquivalent: 1000,
    },
    {
      currency: "USD",
      initialAmount: 2000,
      remaining: 1000,
      remainingDollarsEquivalent: 1000,
      initialDollarsEquivalent: 2000,
    },
    {
      currency: "OP",
      initialAmount: 10,
      initialDollarsEquivalent: 2000,
      remaining: 0,
      dollarsConversionRate: 2000,
      remainingDollarsEquivalent: 0,
    },
    {
      currency: "STARK",
      initialAmount: 10,
      remaining: 0,
      remainingDollarsEquivalent: undefined,
      initialDollarsEquivalent: undefined,
    },
  ],
};

export const Default = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget {...defaultProps} {...args} />
      <Tooltip />
    </div>
  ),
};

export const WithPreferedCurrency = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget {...defaultProps} {...args} preferedCurrency="ETH" />
      <Tooltip />
    </div>
  ),
};

export const WithOneCurrency = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget
        {...defaultProps}
        {...args}
        budgets={[
          {
            currency: "APT",
            initialAmount: 20,
            initialDollarsEquivalent: 2000,
            dollarsConversionRate: 100,
            remaining: 10,
            remainingDollarsEquivalent: 1000,
          },
        ]}
      />
      <Tooltip />
    </div>
  ),
};

export const With0RemainingCurrencyCurrency = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget {...With0RemainingCurrencyCurrencyProps} {...args} />
      <Tooltip />
    </div>
  ),
};
