import { DebouncedFunc, debounce } from "lodash";
import { useCallback } from "react";

export interface UseAutoSaveProps {
  storage_key: string;
  delay?: 1000;
}
export default function useAutosave<T>({
  storage_key,
  delay = 1000,
}: UseAutoSaveProps): DebouncedFunc<(newData: T) => Promise<void>> {
  const debouncedSave = useCallback(
    debounce(async (newData: T) => {
      localStorage.setItem(storage_key, JSON.stringify(newData));
    }, delay),
    []
  );

  return debouncedSave;
}
