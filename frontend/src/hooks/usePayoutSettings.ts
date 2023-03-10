import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import isDefined from "src/utils/isDefined";
import { GetUserPayoutSettingsQuery } from "src/__generated/graphql";
import { useHasuraQuery } from "./useHasuraQuery";

export default function usePayoutSettings(githubUserId?: number) {
  const query = useHasuraQuery<GetUserPayoutSettingsQuery>(GET_USER_PAYOUT_SETTINGS, HasuraUserRole.RegisteredUser, {
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const userInfo = query.data?.authGithubUsers.at(0)?.user?.userInfo;
  const valid = query.data?.authGithubUsers.at(0)?.user?.userInfo?.arePayoutSettingsValid;
  const invoiceNeeded = isDefined(query.data?.authGithubUsers.at(0)?.user?.userInfo?.identity?.Company);

  return {
    ...query,
    data: userInfo,
    valid,
    invoiceNeeded,
  };
}

const USER_PAYOUT_SETTINGS_FRAGMENT = gql`
  fragment UserPayoutSettings on UserInfo {
    identity
    location
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
