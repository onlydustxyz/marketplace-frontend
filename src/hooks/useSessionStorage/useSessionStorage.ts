import { useCallback, useEffect } from "react";
import { useState } from "react";

export type UseSessionStorageOptions = {
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

export type UseSessionStorageStatus = "idle" | "ready" | "error";

/**
 * Modified `useState` hook that syncs with useSessionStorage.
 *
 * @param key
 * @param initialValue
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useSessionStorage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: UseSessionStorageOptions
): [T, (value: T) => void, UseSessionStorageStatus, () => void, (pattern: string) => void] {
  const [status, setStatus] = useState<UseSessionStorageStatus>("idle");
  const [storedValue, setStoredValue] = useState(initialValue);
  const { deserialize = JSON.parse, serialize = JSON.stringify } = options || {};

  useEffect(() => {
    try {
      const item = sessionStorage.getItem(key);
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
        setStoredValue(value);
        sessionStorage.setItem(key, serialize(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key, serialize]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const clearByPattern = useCallback((pattern: string) => {
    try {
      for (const item in sessionStorage) {
        if (item.indexOf(pattern) === 0) {
          sessionStorage.removeItem(item);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [storedValue, setValue, status, removeValue, clearByPattern];
}
