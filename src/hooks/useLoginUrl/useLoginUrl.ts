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
    const LOGIN_URL = `${config.LOGIN_URL}?redirect_url=${encodeURI(redirect || window.location.href)}`;
    const permission = storage.getValue();
    if (permission) {
      return `${LOGIN_URL}&scope=${permission}`;
    }

    return `${LOGIN_URL}&scope=user:email`;
  };
};
