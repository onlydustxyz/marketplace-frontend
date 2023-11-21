import { useCallback, useEffect, useState } from "react";
import { useTokenSet } from "../useTokenSet";
import jwtDecode from "jwt-decode";
import { HasuraJWT } from "src/types";
import MeApi from "src/api/me";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

const fetchGithubOrganizationMembership = async (token: string, organization: UseGithubOrganizationsResponse) => {
  const { data: userInfo } = await MeApi.queries.useGetMe({});

  const organizationLogin = organization.login;
  const userLogin = userInfo?.login;

  return fetch(`https://api.github.com/orgs/${organizationLogin}/memberships/${userLogin}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(data => data.json());
};

const getOrganizationMembership = async (token: string, organization: UseGithubOrganizationsResponse) => {
  if (token) {
    try {
      const decodedToken = jwtDecode<HasuraJWT>(token);
      const claims = decodedToken["https://hasura.io/jwt/claims"] as { [key: string]: string };
      const githubAccessToken = claims["x-hasura-githubAccessToken"];
      return fetchGithubOrganizationMembership(githubAccessToken, organization);
    } catch {
      return undefined;
    }
  }
};

export const useGithubOrganizationMembership = ({
  organization,
}: {
  organization: UseGithubOrganizationsResponse;
}): [boolean] => {
  const { tokenSet } = useTokenSet();
  const [isMember, setIsMember] = useState<boolean>(false);

  const getMembership = useCallback(async () => {
    if (tokenSet?.accessToken) {
      const membership = await getOrganizationMembership(tokenSet?.accessToken, organization);
      setIsMember(membership.role === "member");
    }
  }, [tokenSet]);

  useEffect(() => {
    getMembership();
  }, [tokenSet]);

  return [isMember];
};
