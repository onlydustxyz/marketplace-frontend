import { useCallback, useEffect, useState } from "react";
import { useTokenSet } from "../useTokenSet";
import jwtDecode from "jwt-decode";
import { HasuraJWT } from "src/types";
import MeApi from "src/api/me";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

const fetchGithubOrganizationMembership = (
  token: string,
  organization: UseGithubOrganizationsResponse,
  userLogin: string
) => {
  return fetch(`https://api.github.com/orgs/${organization.login}/memberships/${userLogin}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(data => data.json());
};

const getOrganizationMembership = (token: string, organization: UseGithubOrganizationsResponse, userLogin: string) => {
  if (token) {
    try {
      const decodedToken = jwtDecode<HasuraJWT>(token);
      const claims = decodedToken["https://hasura.io/jwt/claims"] as { [key: string]: string };
      const githubAccessToken = claims["x-hasura-githubAccessToken"];
      return fetchGithubOrganizationMembership(githubAccessToken, organization, userLogin);
    } catch {
      return undefined;
    }
  }
};

export const useGithubOrganizationMembership = ({
  organization,
}: {
  organization: UseGithubOrganizationsResponse;
}): boolean => {
  const { data: userInfo } = MeApi.queries.useGetMe({});
  const { tokenSet } = useTokenSet();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const getMembership = useCallback(async () => {
    if (tokenSet?.accessToken && userInfo) {
      const membership = await getOrganizationMembership(tokenSet?.accessToken, organization, userInfo.login);
      setIsAdmin(membership.role === "admin");
    }
  }, [tokenSet]);

  useEffect(() => {
    getMembership();
  }, [tokenSet]);

  return isAdmin;
};
