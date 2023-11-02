import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { reorderBudgets } from "./utils";

const projectBudgetWithEmptyBudgetsMock: ProjectBudgetType = {
  initialDollarsEquivalent: 10000000,
  remainingDollarsEquivalent: 9974250,
  budgets: [
    {
      currency: "USD",
      initialAmount: 10000000,
      remaining: 9974250,
      remainingDollarsEquivalent: 9974250,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "STARK",
      initialAmount: 1000,
      remaining: 0,
      remainingDollarsEquivalent: 2000,
      initialDollarsEquivalent: 2000,
    },
    {
      currency: "ETH",
      initialAmount: 5000,
      remaining: 0,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
    {
      currency: "APT",
      initialAmount: 5000,
      remaining: 5000,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
    {
      currency: "OP",
      initialAmount: 5000,
      remaining: 0,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
  ],
};

const projectBudgetMock: ProjectBudgetType = {
  initialDollarsEquivalent: 10000000,
  remainingDollarsEquivalent: 9974250,
  budgets: [
    {
      currency: "STARK",
      initialAmount: 1000,
      remaining: 5000,
      remainingDollarsEquivalent: 2000,
      initialDollarsEquivalent: 2000,
    },
    {
      currency: "USD",
      initialAmount: 10000000,
      remaining: 9974250,
      remainingDollarsEquivalent: 9974250,
      initialDollarsEquivalent: 10000000,
    },
    {
      currency: "APT",
      initialAmount: 5000,
      remaining: 5000,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
    {
      currency: "OP",
      initialAmount: 5000,
      remaining: 5000,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
    {
      currency: "ETH",
      initialAmount: 5000,
      remaining: 5000,
      remainingDollarsEquivalent: 5000,
      initialDollarsEquivalent: 5000,
    },
  ],
};

describe("reorderBudgets", () => {
  it("should push correctly empty budgets to the end", () => {
    expect(reorderBudgets(projectBudgetWithEmptyBudgetsMock).budgets).toEqual([
      {
        currency: "USD",
        initialAmount: 10000000,
        remaining: 9974250,
        remainingDollarsEquivalent: 9974250,
        initialDollarsEquivalent: 10000000,
      },
      {
        currency: "APT",
        initialAmount: 5000,
        remaining: 5000,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
      {
        currency: "ETH",
        initialAmount: 5000,
        remaining: 0,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
      {
        currency: "STARK",
        initialAmount: 1000,
        remaining: 0,
        remainingDollarsEquivalent: 2000,
        initialDollarsEquivalent: 2000,
      },
      {
        currency: "OP",
        initialAmount: 5000,
        remaining: 0,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
    ]);
  });

  it("should re-order correctly", () => {
    expect(reorderBudgets(projectBudgetMock).budgets).toEqual([
      {
        currency: "USD",
        initialAmount: 10000000,
        remaining: 9974250,
        remainingDollarsEquivalent: 9974250,
        initialDollarsEquivalent: 10000000,
      },
      {
        currency: "ETH",
        initialAmount: 5000,
        remaining: 5000,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
      {
        currency: "STARK",
        initialAmount: 1000,
        remaining: 5000,
        remainingDollarsEquivalent: 2000,
        initialDollarsEquivalent: 2000,
      },
      {
        currency: "OP",
        initialAmount: 5000,
        remaining: 5000,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
      {
        currency: "APT",
        initialAmount: 5000,
        remaining: 5000,
        remainingDollarsEquivalent: 5000,
        initialDollarsEquivalent: 5000,
      },
    ]);
  });
});
