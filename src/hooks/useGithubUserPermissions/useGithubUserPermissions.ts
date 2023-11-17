import { useCallback, useEffect, useState } from "react";
import { useTokenSet } from "../useTokenSet";
import jwtDecode from "jwt-decode";
import { HasuraJWT } from "src/types";

const getGithubPermissions = (token: string) => {
  return fetch("https://api.github.com/rate_limit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPermissions = async (token: string, requirePermission: string) => {
  if (token) {
    try {
      const decodedToken = jwtDecode<HasuraJWT>(token);
      const claims = decodedToken["https://hasura.io/jwt/claims"] as { [key: string]: string };
      const githubAccessToken = claims["x-hasura-githubAccessToken"];
      const getPermissions = await getGithubPermissions(githubAccessToken);
      const permission = getPermissions.headers.get("x-oauth-scopes");
      console.log("permission", permission);
      return permission?.includes(requirePermission) || false;
    } catch {
      return false;
    }
  }

  return false;
};
export const useLazyGetUserPermissions = (): [(requirePermission: string) => Promise<boolean>] => {
  const { tokenSet } = useTokenSet();

  const getPermission = useCallback(
    async (requirePermission: string) => {
      if (tokenSet?.accessToken) {
        return getPermissions(tokenSet.accessToken, requirePermission);
      }
      return false;
    },
    [tokenSet]
  );

  return [getPermission];
};

export const useGithubUserPermissions = (requirePermission: string): [boolean, "idle" | "ready"] => {
  const { tokenSet } = useTokenSet();
  const [hasPermissionStatus, setHasPermissionsStatus] = useState<"idle" | "ready">("idle");
  const [hasPermission, setHasPermissions] = useState(false);

  const getPermission = useCallback(async () => {
    if (tokenSet?.accessToken) {
      const hasPermission = await getPermissions(tokenSet.accessToken, requirePermission);
      setHasPermissions(hasPermission);
      setHasPermissionsStatus("ready");
    }
  }, [tokenSet]);

  useEffect(() => {
    getPermission();
  }, [tokenSet, requirePermission]);

  return [hasPermission, hasPermissionStatus];
};
