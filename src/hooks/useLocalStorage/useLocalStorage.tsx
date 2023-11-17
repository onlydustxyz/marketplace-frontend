import { useCallback, useEffect } from "react";
import { useState } from "react";

export type UseLocalStorageOptions = {
  /**
   * Function for converting to string.
   *
   * @default JSON.stringify
   */
  serialize: (value: unknown) => string;

  /**
   * Function to convert stored string to object value.
   *
   * @default JSON.parse
   */
  deserialize: (value: string) => unknown;
};

export type UseLocalStorageStatus = "idle" | "ready" | "error";

/**
 * Modified `useState` hook that syncs with uselocalStorage.
 *
 * @param key
 * @param initialValue
 * @param options
 *
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions
): [T, (value: T) => void, UseLocalStorageStatus, () => void, (pattern: string) => void, () => T | undefined] {
  const [status, setStatus] = useState<UseLocalStorageStatus>("idle");
  const [storedValue, setStoredValue] = useState(initialValue);
  const { deserialize = JSON.parse, serialize = JSON.stringify } = options || {};

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      item && setStoredValue(deserialize(item));
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  }, []);

  const setValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, serialize(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key, serialize]
  );

  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : undefined;
    } catch (error) {
      console.error(error);
    }
  }, [key, deserialize]);

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const clearByPattern = useCallback((pattern: string) => {
    try {
      for (const item in localStorage) {
        if (item.indexOf(pattern) === 0) {
          localStorage.removeItem(item);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [storedValue, setValue, status, removeValue, clearByPattern, getValue];
}
