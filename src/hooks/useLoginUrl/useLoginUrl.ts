import config from "src/config";
import { useLocalStorage } from "../useStorage/useStorage";
import { GITHUB_PERMISSIONS } from "../useGithubUserPermissions/useGithubUserPermissions";

export const useLoginUrlStorageKey = "login-url";
export const useLoginUrlStorage = () => {
  const storage = useLocalStorage<string>({ key: useLoginUrlStorageKey, initialValue: GITHUB_PERMISSIONS.USER_EMAIL });

  return storage;
};

export const useLoginUrl = () => {
  const storage = useLoginUrlStorage();
  return (redirect?: string) => {
    console.log("CUSTOM REDIRECT", redirect);
    const LOGIN_URL = `${config.LOGIN_URL}?redirect_url=${encodeURI(redirect || window.location.href)}`;
    const permission = storage.getValue();
    if (permission) {
      console.log("useLoginUrl - 1", `${LOGIN_URL}&scope=${permission}`);
      return `${LOGIN_URL}&scope=${permission}`;
    }

    console.log("useLoginUrl - 2", `${LOGIN_URL}&scope=user:email`);
    return `${LOGIN_URL}&scope=user:email`;
  };
};
