import { useEffect, useRef, useState } from "react";
import { StorageClass, StorageInterface } from "./Storage";

export interface useStorageInterface<T> {
  initialValue: T;
  key: string;
}

export const useStorage = <T>({
  initialValue,
  key,
  storageType = localStorage,
}: useStorageInterface<T> & { storageType: Storage }): StorageInterface<T> => {
  const storage = useRef(new StorageClass<T>(key, initialValue, storageType));

  useEffect(() => {
    storage.current.init();
  }, []);

  return storage.current;
};

export const useStorageSubscription = <T>({
  initialValue,
  key,
  storageType = localStorage,
}: useStorageInterface<T> & { storageType: Storage }): [{ value: T; ready: boolean }, StorageInterface<T>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const storage = useRef(
    new StorageClass<T>(key, initialValue, storageType, (value: T) => {
      setValue(value);
      if (status === "idle") {
        setStatus("ready");
      }
    })
  );

  useEffect(() => {
    storage.current.init();
  }, []);

  return [{ value, ready: status === "ready" }, storage.current];
};

export const useSessionStorageState = <T>({ initialValue, key }: useStorageInterface<T>) => {
  return useStorageSubscription({ initialValue, key, storageType: sessionStorage });
};

export const useSessionStorage = <T>({ initialValue, key }: useStorageInterface<T>) => {
  return useStorage({ initialValue, key, storageType: sessionStorage });
};

export const useLocalStorageState = <T>({ initialValue, key }: useStorageInterface<T>) => {
  return useStorageSubscription({ initialValue, key, storageType: localStorage });
};

export const useLocalStorage = <T>({ initialValue, key }: useStorageInterface<T>) => {
  return useStorage({ initialValue, key, storageType: localStorage });
};
