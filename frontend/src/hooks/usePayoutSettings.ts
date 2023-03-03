import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { GetUserPayoutSettingsQuery } from "src/__generated/graphql";
import { useHasuraQuery } from "./useHasuraQuery";

export default function usePayoutSettings(githubUserId?: number) {
  const query = useHasuraQuery<GetUserPayoutSettingsQuery>(GET_USER_PAYOUT_SETTINGS, HasuraUserRole.RegisteredUser, {
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const payoutSettings = query.data?.authGithubUsers.at(0)?.user?.userInfo?.payoutSettings;
  const valid = query.data?.authGithubUsers.at(0)?.user?.userInfo?.arePayoutSettingsValid;

  return {
    ...query,
    data: payoutSettings,
    valid: !!valid,
  };
}

const USER_PAYOUT_SETTINGS_FRAGMENT = gql`
  fragment UserPayoutSettings on UserInfo {
    payoutSettings
    arePayoutSettingsValid
  }
`;

export const GET_USER_PAYOUT_SETTINGS = gql`
  ${USER_PAYOUT_SETTINGS_FRAGMENT}
  query GetUserPayoutSettings($githubUserId: bigint!) {
    authGithubUsers(where: { githubUserId: { _eq: $githubUserId } }) {
      user {
        userInfo {
          ...UserPayoutSettings
        }
      }
    }
  }
`;
