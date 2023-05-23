import { gql } from "@apollo/client";
import isDefined from "src/utils/isDefined";
import { useGetUserPayoutSettingsQuery } from "src/__generated/graphql";

export default function usePayoutSettings(githubUserId?: number) {
  const query = useGetUserPayoutSettingsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const userInfo = query.data?.registeredUsers.at(0)?.userInfo;
  const valid = query.data ? query.data.registeredUsers.at(0)?.userInfo?.arePayoutSettingsValid || false : undefined;
  const invoiceNeeded = isDefined(query.data?.registeredUsers.at(0)?.userInfo?.identity?.Company);

  return {
    ...query,
    data: userInfo,
    valid,
    invoiceNeeded,
  };
}

gql`
  fragment UserPayoutSettings on UserInfo {
    userId
    identity
    location
    payoutSettings
    arePayoutSettingsValid
  }

  query GetUserPayoutSettings($githubUserId: bigint!) {
    registeredUsers(where: { githubUserId: { _eq: $githubUserId } }) {
      ...UserId
      githubUserId
      userInfo {
        ...UserPayoutSettings
      }
    }
  }
`;
