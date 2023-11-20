import config from "src/config";
import { useLocalStorage } from "../useStorage/useStorage";
// read:org
export const useLoginUrlStorageKey = "login-url";
const defaultPermission = "user:email";

export const useLoginUrlStorage = () => {
  const storage = useLocalStorage<string>({ key: useLoginUrlStorageKey, initialValue: defaultPermission });

  return storage;
};

export const useLoginUrl = () => {
  const LOGIN_URL = `${config.LOGIN_URL}?redirect_url=${encodeURI(window.location.origin)}`;
  const storage = useLoginUrlStorage();
  return () => {
    const permission = storage.getValue();
    if (permission) {
      console.log("LOGINNNN", `${LOGIN_URL}&scope=${permission}`);
      return `${LOGIN_URL}&scope=${permission}`;
    }

    return `${LOGIN_URL}&scope=user:email`;
  };
};
