import { QueryResult } from "@apollo/client";
import { PayoutSettingsQuery, ProfileQuery } from "src/__generated/graphql";

export default function isPayoutInfoMissing(queryResult: QueryResult<ProfileQuery> | QueryResult<PayoutSettingsQuery>) {
  const payoutSettings = queryResult?.data?.userInfo?.[0]?.payoutSettings;
  return (
    queryResult?.data &&
    !(
      payoutSettings?.EthTransfer?.Address ||
      payoutSettings?.EthTransfer?.Name ||
      (payoutSettings?.WireTransfer?.IBAN && payoutSettings?.WireTransfer?.BIC)
    )
  );
}
