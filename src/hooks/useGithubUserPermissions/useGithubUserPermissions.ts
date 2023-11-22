import { useCallback, useEffect, useState } from "react";
import { useTokenSet } from "../useTokenSet";
import jwtDecode from "jwt-decode";
import { HasuraJWT } from "src/types";

export enum GITHUB_PERMISSIONS {
  READ_ORG = "read:org",
  USER_EMAIL = "user:email",
}
const getGithubPermissions = (token: string) => {
  return fetch("https://api.github.com/rate_limit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPermissions = async (token: string, requirePermission: GITHUB_PERMISSIONS) => {
  if (token) {
    try {
      const decodedToken = jwtDecode<HasuraJWT>(token);
      const claims = decodedToken["https://hasura.io/jwt/claims"] as { [key: string]: string };
      const githubAccessToken = claims["x-hasura-githubAccessToken"];
      const getPermissions = await getGithubPermissions(githubAccessToken);
      const permission = getPermissions.headers.get("x-oauth-scopes");
      return permission?.includes(requirePermission) || false;
    } catch {
      return undefined;
    }
  }

  return false;
};

export const useLazyGetUserPermissions = (): [(requirePermission: GITHUB_PERMISSIONS) => Promise<boolean>] => {
  const { tokenSet } = useTokenSet();

  const getPermission = useCallback(
    async (requirePermission: GITHUB_PERMISSIONS) => {
      if (tokenSet?.accessToken) {
        const hasPermission = await getPermissions(tokenSet.accessToken, requirePermission);
        return hasPermission || false;
      }
      return false;
    },
    [tokenSet]
  );

  return [getPermission];
};

export const useGithubUserPermissions = (requirePermission: GITHUB_PERMISSIONS): [boolean, "idle" | "ready"] => {
  const { tokenSet } = useTokenSet();
  const [hasPermissionStatus, setHasPermissionsStatus] = useState<"idle" | "ready">("idle");
  const [hasPermission, setHasPermissions] = useState(false);

  const getPermission = useCallback(async () => {
    if (tokenSet?.accessToken) {
      const hasPermission = await getPermissions(tokenSet.accessToken, requirePermission);
      setHasPermissions(hasPermission || false);
      setHasPermissionsStatus("ready");
    }
  }, [tokenSet]);

  useEffect(() => {
    getPermission();
  }, [tokenSet, requirePermission]);

  return [hasPermission, hasPermissionStatus];
};
