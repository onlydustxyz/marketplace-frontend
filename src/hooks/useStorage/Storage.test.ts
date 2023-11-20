import { StorageClass } from "./Storage";

describe("StorageClass", () => {
  const key = "testKey";
  const initialValue = 42;

  afterEach(() => {
    localStorage.clear(); // Clear storage after each test
  });

  it("should initialize with default values", () => {
    const storage = new StorageClass<number>(key, initialValue);
    expect(storage.key).toBe(key);
    expect(storage.value).toBe(initialValue);
  });

  it("should set and get values correctly", () => {
    const storage = new StorageClass<number>(key, initialValue);
    const newValue = 100;

    storage.setValue(newValue);
    expect(storage.getValue()).toBe(newValue);
  });

  it("should set and get values correctly with callback", () => {
    const callback = jest.fn();
    const storage = new StorageClass<number>(key, initialValue, localStorage, callback);
    const newValue = 100;

    storage.setValue(newValue);
    expect(storage.getValue()).toBe(newValue);
    expect(callback).toHaveBeenCalledWith(newValue);
  });

  it("should set and get values correctly with function", () => {
    const storage = new StorageClass<number>(key, initialValue);
    const updateFn = (prev: number | undefined) => (prev ? prev + 1 : 1);

    storage.setValue(updateFn);
    expect(storage.getValue()).toBe(43);
  });

  it("should remove values correctly", () => {
    const storage = new StorageClass<number>(key, initialValue);
    storage.removeValue();

    expect(storage.getValue()).toBe(initialValue);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("should remove values correctly with callback", () => {
    const callback = jest.fn();
    const storage = new StorageClass<number>(key, initialValue, localStorage, callback);
    storage.removeValue();

    expect(storage.getValue()).toBe(initialValue);
    expect(localStorage.getItem(key)).toBeNull();
    expect(callback).toHaveBeenCalledWith(initialValue);
  });

  it("should remove values based on a pattern", () => {
    const storage = new StorageClass<number>(key, initialValue, localStorage);
    const pattern = "testPattern";

    localStorage.setItem("testPattern1", "value1");
    localStorage.setItem("testPattern2", "value2");
    localStorage.setItem("otherPattern", "value3");

    storage.removePattern(pattern);

    // Only items matching the pattern should be removed
    expect(localStorage.getItem("testPattern1")).toBeNull();
    expect(localStorage.getItem("testPattern2")).toBeNull();
    expect(localStorage.getItem("otherPattern")).toEqual("value3");
  });
});
