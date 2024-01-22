import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import Skeleton from "src/components/Skeleton";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import View from "./View";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";

export type MyPayoutInfoType = components["schemas"]["UserPayoutInformationResponse"];
export type MyRewardsPendingInvoiceType = components["schemas"]["MyRewardsListResponse"];

export default function InvoiceSubmission() {
  const { T } = useIntl();
  const { user } = useAuth0();

  const showToaster = useShowToaster();

  const {
    data: rewardsPendingInvoice,
    isLoading: isRewardsPendingInvoiceLoading,
    isError: isRewardsPendingInvoiceError,
  } = MeApi.queries.useGetMePendingInvoices({});

  const {
    data: payoutInfo,
    isLoading: isPayoutInfoLoading,
    isError: isPayoutInfoError,
  } = MeApi.queries.useGetMyPayoutInfo({});

  if (isRewardsPendingInvoiceLoading || isPayoutInfoLoading) {
    return (
      <div className="grid w-full">
        <Skeleton variant="invoice" />
      </div>
    );
  }

  if (isRewardsPendingInvoiceError || isPayoutInfoError) {
    showToaster(T("reward.details.earning.invoiceError"), { isError: true });
    return null;
  }

  if (
    !isRewardsPendingInvoiceLoading &&
    !isRewardsPendingInvoiceError &&
    rewardsPendingInvoice?.rewards?.length === 0
  ) {
    return null;
  }

  return (
    <View
      {...{
        githubUserId: getGithubUserIdFromSub(user?.sub) || 0,
        paymentRequests: rewardsPendingInvoice?.rewards || [],
        payoutInfo: payoutInfo || {},
      }}
    />
  );
}
