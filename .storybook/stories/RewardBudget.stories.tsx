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

/**
 * Full
 * 1 currency
 * currency with 0 remaining
 * prefered currency
 */

const defaultProps: ComponentProps<typeof RewardBudget> = {
  initialDollarsEquivalent: 10000,
  remainingDollarsEquivalent: 5000,
  budgets: [
    {
      currency: "APT",
      initialAmount: 20,
      initialDollarsEquivalent: 2000,
      dollarsConversionRate: 100,
      remaining: 10,
      remainingDollarsEquivalent: 2000,
    },
    {
      currency: "ETH",
      initialAmount: 20,
      initialDollarsEquivalent: 2000,
      remaining: 20,
      remainingDollarsEquivalent: 2000,
    },
    {
      currency: "USD",
      initialAmount: 20,
      initialDollarsEquivalent: 20,
      remaining: 20,
      remainingDollarsEquivalent: 20,
    },
    {
      currency: "STARK",
      initialAmount: 0,
      initialDollarsEquivalent: 0,
      remaining: 0,
      remainingDollarsEquivalent: 0,
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

export const Default2 = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget {...defaultProps} {...args} onChange={d => console.log("save", d)} preferedCurrency="ETH" />
      <Tooltip />
    </div>
  ),
};
