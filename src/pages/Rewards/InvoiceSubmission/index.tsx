import { MyRewardType } from "src/components/UserRewardTable/Line";
import { useIntl } from "src/hooks/useIntl";
import {
  MarkInvoiceAsReceivedMutationVariables,
  UserPayoutSettingsFragment,
  useMarkInvoiceAsReceivedMutation,
} from "src/__generated/graphql";
import { useShowToaster } from "src/hooks/useToaster";
import View from "./View";

type Props = {
  githubUserId: number;
  paymentRequests: MyRewardType[];
  userInfos: UserPayoutSettingsFragment;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, userInfos }: Props) {
  const { T } = useIntl();

  const showToaster = useShowToaster();

  const [markInvoiceAsReceived] = useMarkInvoiceAsReceivedMutation({
    variables: { payments: paymentRequests.map(p => p.id) },
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

  return <View {...{ githubUserId, paymentRequests: paymentRequests, markInvoiceAsReceived, userInfos }} />;
}
