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
  const valid =
    payoutSettings &&
    (payoutSettings?.EthTransfer?.Address ||
      payoutSettings?.EthTransfer?.Name ||
      (payoutSettings?.WireTransfer?.IBAN && payoutSettings?.WireTransfer?.BIC));

  return {
    ...query,
    data: payoutSettings,
    valid: !!valid,
  };
}

export const GET_USER_PAYOUT_SETTINGS = gql`
  query GetUserPayoutSettings($githubUserId: bigint!) {
    authGithubUsers(where: { githubUserId: { _eq: $githubUserId } }) {
      user {
        userInfo {
          payoutSettings
        }
      }
    }
  }
`;
