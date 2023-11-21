import { renderHook, act } from "@testing-library/react-hooks";
import { useStorage, useStorageSubscription } from "./useStorage";

describe("useStorage", () => {
  const key = "testKey";
  const initialValue = 42;
  const storageType = localStorage;

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize useStorage hook", () => {
    const { result } = renderHook(() => useStorage({ initialValue, key, storageType }));
    const { getValue, setValue, removeValue, removePattern } = result.current;

    expect(getValue()).toBe(initialValue);

    act(() => {
      setValue(100);
    });

    expect(getValue()).toBe(100);

    act(() => {
      removeValue();
    });

    expect(getValue()).toBe(initialValue);

    act(() => {
      setValue(200);
    });

    act(() => {
      removePattern("testPattern");
    });

    expect(getValue()).toBe(200);
  });
});

describe("useStorageSubscription", () => {
  const key = "testKey";
  const initialValue = 42;
  const storageType = localStorage;

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize useStorageSubscription hook", () => {
    const { result } = renderHook(() => useStorageSubscription({ initialValue, key, storageType }));
    const [{ value, ready }, { getValue, setValue, removeValue, removePattern }] = result.current;

    expect(value).toBe(initialValue);
    expect(ready).toBe(false);

    act(() => {
      setValue(100);
    });

    expect(getValue()).toBe(100);

    act(() => {
      removeValue();
    });

    expect(getValue()).toBe(initialValue);

    act(() => {
      setValue(200);
    });

    act(() => {
      removePattern("testPattern");
    });

    expect(getValue()).toBe(200);
  });
});
