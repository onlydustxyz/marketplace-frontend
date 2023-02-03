import { act, renderHook } from "@testing-library/react-hooks";
import { Currency, PaymentStatus } from "src/types";
import { describe, expect, it } from "vitest";
import usePaymentSorting, { Field } from "./usePaymentSorting";

const payments = [
  {
    id: "id1",
    requestedAt: new Date("2023-01-01"),
    reason: "reason",
    amount: {
      value: 3,
      currency: Currency.USD,
    },
    status: PaymentStatus.ACCEPTED,
    recipient: {
      avatarUrl: "url",
      login: "userB",
    },
  },
  {
    id: "id2",
    requestedAt: new Date("2023-01-02"),
    reason: "reason",
    amount: {
      value: 4,
      currency: Currency.USD,
    },
    status: PaymentStatus.WAITING_PAYMENT,
    recipient: {
      avatarUrl: "url",
      login: "userA",
    },
  },
];

describe("useWorkEstimation", () => {
  const { result } = renderHook(() => usePaymentSorting(payments));

  it("should initially sort by descending date", () => {
    expect(result.current.sortedPayments[0].id).toEqual("id2");
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(false);
  });

  it("should be able to sort by date", () => {
    const { result } = renderHook(() => usePaymentSorting(payments));
    act(() => result.current.applySorting(Field.Date));
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sortedPayments[0].id).toEqual("id1");
    act(() => result.current.applySorting(Field.Date));
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sortedPayments[0].id).toEqual("id2");
  });

  it("should be able to sort by contribution", () => {
    const { result } = renderHook(() => usePaymentSorting(payments));
    act(() => result.current.applySorting(Field.Contribution));
    expect(result.current.sorting.field).toEqual(Field.Contribution);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sortedPayments[0].id).toEqual("id2");
    act(() => result.current.applySorting(Field.Contribution));
    expect(result.current.sorting.field).toEqual(Field.Contribution);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sortedPayments[0].id).toEqual("id1");
  });

  it("should be able to sort by amount", () => {
    const { result } = renderHook(() => usePaymentSorting(payments));
    act(() => result.current.applySorting(Field.Amount));
    expect(result.current.sorting.field).toEqual(Field.Amount);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sortedPayments[0].id).toEqual("id1");
    act(() => result.current.applySorting(Field.Amount));
    expect(result.current.sorting.field).toEqual(Field.Amount);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sortedPayments[0].id).toEqual("id2");
  });

  it("should be able to sort by status", () => {
    const { result } = renderHook(() => usePaymentSorting(payments));
    act(() => result.current.applySorting(Field.Status));
    expect(result.current.sorting.field).toEqual(Field.Status);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sortedPayments[0].id).toEqual("id2");
    act(() => result.current.applySorting(Field.Status));
    expect(result.current.sorting.field).toEqual(Field.Status);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sortedPayments[0].id).toEqual("id1");
  });
});
