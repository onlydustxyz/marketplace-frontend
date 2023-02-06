import { act, renderHook } from "@testing-library/react-hooks";
import { Sortable } from "src/types";
import { describe, expect, it } from "vitest";
import usePaymentSorting, { Field } from "./usePaymentSorting";

const payments: (Sortable & { id: string })[] = [
  {
    id: "id1",
    sortingFields: {
      [Field.Date]: new Date("2023-01-01"),
      [Field.Contribution]: "userB23",
      [Field.Amount]: 3,
      [Field.Status]: 1,
    },
  },
  {
    id: "id2",
    sortingFields: {
      [Field.Date]: new Date("2023-01-02"),
      [Field.Contribution]: "userA23",
      [Field.Amount]: 4,
      [Field.Status]: 0,
    },
  },
];

describe("useWorkEstimation", () => {
  const { result } = renderHook(() => usePaymentSorting());

  it("should initially sort by descending date", () => {
    expect(result.current.sort(payments)[0].id).toEqual("id2");
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(false);
  });

  it("should be able to sort by date", () => {
    const { result } = renderHook(() => usePaymentSorting());
    act(() => result.current.applySorting(Field.Date));
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sort(payments)[0].id).toEqual("id1");
    act(() => result.current.applySorting(Field.Date));
    expect(result.current.sorting.field).toEqual(Field.Date);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sort(payments)[0].id).toEqual("id2");
  });

  it("should be able to sort by contribution", () => {
    const { result } = renderHook(() => usePaymentSorting());
    act(() => result.current.applySorting(Field.Contribution));
    expect(result.current.sorting.field).toEqual(Field.Contribution);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sort(payments)[0].id).toEqual("id2");
    act(() => result.current.applySorting(Field.Contribution));
    expect(result.current.sorting.field).toEqual(Field.Contribution);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sort(payments)[0].id).toEqual("id1");
  });

  it("should be able to sort by amount", () => {
    const { result } = renderHook(() => usePaymentSorting());
    act(() => result.current.applySorting(Field.Amount));
    expect(result.current.sorting.field).toEqual(Field.Amount);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sort(payments)[0].id).toEqual("id1");
    act(() => result.current.applySorting(Field.Amount));
    expect(result.current.sorting.field).toEqual(Field.Amount);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sort(payments)[0].id).toEqual("id2");
  });

  it("should be able to sort by status", () => {
    const { result } = renderHook(() => usePaymentSorting());
    act(() => result.current.applySorting(Field.Status));
    expect(result.current.sorting.field).toEqual(Field.Status);
    expect(result.current.sorting.ascending).toEqual(true);
    expect(result.current.sort(payments)[0].id).toEqual("id2");
    act(() => result.current.applySorting(Field.Status));
    expect(result.current.sorting.field).toEqual(Field.Status);
    expect(result.current.sorting.ascending).toEqual(false);
    expect(result.current.sort(payments)[0].id).toEqual("id1");
  });
});
