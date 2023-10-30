import { RewardBudgetUtils } from "./RewardBudget.utils";

describe("Reward Budget utils", () => {
  /* -------------------------------------------------------------------------- */
  /*                             getDollarEquivalent                            */
  /* -------------------------------------------------------------------------- */
  describe("getDollarEquivalent", () => {
    it("should return undefined if rate is not provided", () => {
      const result = RewardBudgetUtils.getDollarEquivalent({ rate: undefined, amount: 100 });
      expect(result).toBeUndefined();
    });

    it("should return undefined when the rate is 0", () => {
      const result = RewardBudgetUtils.getDollarEquivalent({ rate: 0, amount: 100 });
      expect(result).toBe(undefined);
    });

    it("should return the correct dollar equivalent when rate is provided", () => {
      const result = RewardBudgetUtils.getDollarEquivalent({ rate: 0.25, amount: 100 });
      expect(result).toBe(25);

      const result2 = RewardBudgetUtils.getDollarEquivalent({ rate: 1.5, amount: 75 });
      expect(result2).toBe(112.5);
    });

    it("should round the result to 2 decimal places", () => {
      const result = RewardBudgetUtils.getDollarEquivalent({ rate: 0.12345, amount: 100 });
      expect(result).toBe(12.35);
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                                 canRewards                                 */
  /* -------------------------------------------------------------------------- */

  describe("canRewards", () => {
    it("should return false if amount is falsy or less than or equal to 0", () => {
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: 0 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: -5 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: undefined as unknown as number })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: null as unknown as number })).toBe(false);
    });

    it("should return false if remaining is falsy or less than or equal to 0", () => {
      expect(RewardBudgetUtils.canRewards({ remaining: 0, amount: 50 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: -5, amount: 50 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: undefined as unknown as number, amount: 50 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: null as unknown as number, amount: 50 })).toBe(false);
    });

    it("should return false if remaining is less than or equal to amount", () => {
      expect(RewardBudgetUtils.canRewards({ remaining: 50, amount: 50 })).toBe(false);
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: 110 })).toBe(false);
    });

    it("should return true if both amount and remaining are valid", () => {
      expect(RewardBudgetUtils.canRewards({ remaining: 100, amount: 50 })).toBe(true);
      expect(RewardBudgetUtils.canRewards({ remaining: 150, amount: 100 })).toBe(true);
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                           getDollarForLeftToSpend                          */
  /* -------------------------------------------------------------------------- */

  describe("getDollarForLeftToSpend", () => {
    it("should return undefined if selected is not provided", () => {
      const result = RewardBudgetUtils.getDollarForLeftToSpend({
        remaining: 100,
        selected: undefined,
      });
      expect(result).toBeUndefined();
    });

    it("should return undefined if remaining is not provided", () => {
      const result = RewardBudgetUtils.getDollarForLeftToSpend({
        remaining: undefined,
        selected: 50,
      });
      expect(result).toBeUndefined();
    });

    it("should return 0 when selected and remaining are both 0", () => {
      const result = RewardBudgetUtils.getDollarForLeftToSpend({
        remaining: 0,
        selected: 0,
      });
      expect(result).toBe(undefined);
    });

    it("should return the absolute difference when both values are provided", () => {
      const result = RewardBudgetUtils.getDollarForLeftToSpend({
        remaining: 100,
        selected: 50,
      });
      expect(result).toBe(50);

      const result2 = RewardBudgetUtils.getDollarForLeftToSpend({
        remaining: 150,
        selected: 100,
      });
      expect(result2).toBe(50);
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                            getBudgetProgression                            */
  /* -------------------------------------------------------------------------- */

  describe("getBudgetProgression", () => {
    it("should calculate remaining and spending percentages correctly", () => {
      const result = RewardBudgetUtils.getBudgetProgression({
        total: 1000,
        remaining: 500,
        spending: 300,
      });
      expect(result.remaining).toBe(50);
      expect(result.spending).toBe(30);

      const result2 = RewardBudgetUtils.getBudgetProgression({
        total: 2000,
        remaining: 1000,
        spending: 150,
      });
      expect(result2.remaining).toBe(50);
      expect(result2.spending).toBe(7);
    });

    it("should handle zero and negative values for total, remaining, and spending", () => {
      const result = RewardBudgetUtils.getBudgetProgression({
        total: 0,
        remaining: 0,
        spending: 0,
      });
      expect(result.remaining).toBe(0);
      expect(result.spending).toBe(0);

      const result2 = RewardBudgetUtils.getBudgetProgression({
        total: -1000,
        remaining: -500,
        spending: -300,
      });
      expect(result2.remaining).toBe(0);
      expect(result2.spending).toBe(0);
    });

    it("should handle cases where total is less than remaining or spending", () => {
      const result = RewardBudgetUtils.getBudgetProgression({
        total: 100,
        remaining: 200,
        spending: 150,
      });
      expect(result.remaining).toBe(200);
      expect(result.spending).toBe(150);
    });
  });
});
