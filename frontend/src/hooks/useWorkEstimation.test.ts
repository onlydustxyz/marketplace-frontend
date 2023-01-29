import { act, renderHook } from "@testing-library/react-hooks";
import { BASE_RATE_USD, DEFAULT_NUMBER_OF_DAYS, useWorkEstimation } from "src/hooks/useWorkEstimation";
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("useWorkEstimation", () => {
  const budget = {
    initialAmount: 200,
    remainingAmount: 10000,
  };
  const onChange = vi.fn();
  const initialAmountToPay = DEFAULT_NUMBER_OF_DAYS * BASE_RATE_USD;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return an initial amount", () => {
    const { result } = renderHook(() => useWorkEstimation(onChange, budget));
    expect(result.current.amountToPay).toBe(initialAmountToPay);
  });

  it("should initially call the onChange callback with the initial amount", () => {
    renderHook(() => useWorkEstimation(onChange, budget));
    expect(onChange).toHaveBeenCalledWith(initialAmountToPay);
  });

  it("should call the onChange callback when amount has changed", () => {
    const { result } = renderHook(() => useWorkEstimation(onChange, budget));
    onChange.mockClear();
    act(() => {
      result.current.tryIncreaseNumberOfDays();
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(initialAmountToPay + BASE_RATE_USD);
  });
});
