import { useMemo } from "react";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useAuth";

export const useAccessToken = () => {
  const rawHasuraToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_SET_KEY);

  const hasuraToken = useMemo(() => {
    if (!rawHasuraToken) return null;
    return JSON.parse(rawHasuraToken);
  }, [rawHasuraToken]);

  return hasuraToken?.accessToken;
};
