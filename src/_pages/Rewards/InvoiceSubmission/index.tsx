import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import BillingApi from "src/api/me/billing";
import { MeTypes } from "src/api/me/types";
import Skeleton from "src/components/Skeleton";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import View from "./View";

export type MyBillingProfileType = components["schemas"]["CompanyBillingProfileResponse"];
export type MyRewardsPendingInvoiceType = components["schemas"]["MyRewardsListResponse"];

export default function InvoiceSubmission() {
  const { T } = useIntl();
  const { githubUserId } = useCurrentUser();

  const showToaster = useShowToaster();

  const {
    data: rewardsPendingInvoice,
    isLoading: isRewardsPendingInvoiceLoading,
    isError: isRewardsPendingInvoiceError,
  } = MeApi.queries.useGetMePendingInvoices({});

  const {
    data: billingProfile,
    isLoading: isBillingProfileLoading,
    isError: isBillingProfileError,
  } = BillingApi.queries.useBillingProfile({
    params: {
      profile: MeTypes.billingProfileType.Company,
    },
  });

  if (isRewardsPendingInvoiceLoading || isBillingProfileLoading) {
    return (
      <div className="grid w-full">
        <Skeleton variant="invoice" />
      </div>
    );
  }

  if (isRewardsPendingInvoiceError || isBillingProfileError) {
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
        githubUserId: githubUserId || 0,
        paymentRequests: rewardsPendingInvoice?.rewards || [],
        billingProfile,
      }}
    />
  );
}
