import { MyRewardType } from "src/components/UserRewardTable/Line";
import { useIntl } from "src/hooks/useIntl";
import {
  MarkInvoiceAsReceivedMutationVariables,
  UserPayoutSettingsFragment,
  useMarkInvoiceAsReceivedMutation,
} from "src/__generated/graphql";
import { useShowToaster } from "src/hooks/useToaster";
import View from "./View";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { components } from "src/__generated/api";
import { useAuth } from "src/hooks/useAuth";
import Skeleton from "src/components/Skeleton";

export type MyPayoutInfoType = components["schemas"]["UserPayoutInformationResponse"];
export type MyRewardsPendingInvoiceType = components["schemas"]["MyRewardsListResponse"];

export default function InvoiceSubmission() {
  const { T } = useIntl();
  const { githubUserId } = useAuth();

  const showToaster = useShowToaster();

  const {
    data: rewardsPendingInvoice,
    isLoading: isRewardsPendingInvoiceLoading,
    isError: isRewardsPendingInvoiceError,
  } = useRestfulData<MyRewardsPendingInvoiceType>({
    resourcePath: ApiResourcePaths.GET_MY_REWARDS_PENDING_INVOICE,
    method: "GET",
  });

  const {
    data: payoutInfo,
    isLoading: isPayoutInfoLoading,
    isError: isPayoutInfoError,
  } = useRestfulData<MyPayoutInfoType>({
    resourcePath: ApiResourcePaths.GET_MY_PAYOUT_INFO,
    method: "GET",
  });

  const [markInvoiceAsReceived] = useMarkInvoiceAsReceivedMutation({
    variables: { payments: rewardsPendingInvoice?.rewards?.map(p => p.id) },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("invoiceSubmission.toaster.success")),
    update: (cache, _, { variables }) => {
      const { payments } = variables as MarkInvoiceAsReceivedMutationVariables;
      const paymentIds = [payments].flat();

      paymentIds.map(id => {
        cache.modify({
          id: `PaymentRequests:${id}`,
          fields: {
            invoiceReceivedAt: () => new Date(),
          },
        });
      });
    },
  });

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
        githubUserId: githubUserId || 0,
        paymentRequests: rewardsPendingInvoice?.rewards || [],
        markInvoiceAsReceived,
        payoutInfo: payoutInfo || {},
      }}
    />
  );
}
