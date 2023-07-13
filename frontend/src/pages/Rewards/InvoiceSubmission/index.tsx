import { gql } from "@apollo/client";
import { Reward } from "src/components/UserRewardTable/Line";
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
  paymentRequests: Reward[];
  userInfos: UserPayoutSettingsFragment;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, userInfos }: Props) {
  const { T } = useIntl();

  const showToaster = useShowToaster();

  const [markInvoiceAsReceived] = useMarkInvoiceAsReceivedMutation({
    variables: { paymentReferences: paymentRequests.map(p => ({ projectId: p.project?.id || "", paymentId: p.id })) },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("invoiceSubmission.toaster.success")),
    update: (cache, _, { variables }) => {
      const { paymentReferences } = variables as MarkInvoiceAsReceivedMutationVariables;
      const paymentIds = Array.isArray(paymentReferences)
        ? paymentReferences.map(p => p.paymentId)
        : [paymentReferences.paymentId];

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

gql`
  mutation markInvoiceAsReceived($paymentReferences: [PaymentReference!]!) {
    markInvoiceAsReceived(paymentReferences: $paymentReferences)
  }
`;
