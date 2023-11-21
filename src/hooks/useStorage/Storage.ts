export interface StorageInterface<T> {
  key: string;
  initialValue: T;
  value: T;
  getValue: () => T;
  setValue: (newvalue: T | ((prev: T | undefined) => T)) => void;
  removeValue: () => void;
  removePattern: (pattern: string) => void;
}

export class StorageClass<T> implements StorageInterface<T> {
  key: string;
  value: T;
  storage: Storage;
  initialValue: T;
  callback?: (v: T) => void;

  constructor(key: string, initialValue: T, storage: Storage = localStorage, callback?: (v: T) => void) {
    this.key = key;
    this.value = initialValue;
    this.initialValue = initialValue;
    this.storage = storage;
    this.callback = callback;
  }

  getValue = () => {
    try {
      const item = this.storage.getItem(this.key);
      if (item) {
        this.value = JSON.parse(item);
      }

      return this.value;
    } catch (err) {
      return this.initialValue;
    }
  };

  setValue = (newvalue: T | ((prev: T) => T)) => {
    try {
      if (typeof newvalue === "function") {
        const getValueFn = newvalue as (prev: T | undefined) => T;
        this.value = getValueFn(this.value);
      } else {
        this.value = newvalue;
      }

      this.storage.setItem(this.key, JSON.stringify(this.value));
      this.callback?.(this.value);
      return this.value;
    } catch {
      return this.initialValue;
    }
  };

  removeValue = () => {
    try {
      this.storage.removeItem(this.key);
      this.value = this.initialValue;
      this.callback?.(this.value);
      return this.value;
    } catch {
      return this.initialValue;
    }
  };

  removePattern = (pattern: string) => {
    try {
      for (const item in this.storage) {
        if (item.indexOf(pattern) === 0) {
          this.storage.removeItem(item);
        }
      }
    } catch {
      return undefined;
    }
  };

  init() {
    this.getValue();
  }
}
