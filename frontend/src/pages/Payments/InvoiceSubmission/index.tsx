import { gql } from "@apollo/client";
import { Payment } from "src/components/PayoutTable/Line";
import { useIntl } from "src/hooks/useIntl";
import {
  MarkInvoiceAsReceivedMutation,
  MarkInvoiceAsReceivedMutationVariables,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { useShowToaster } from "src/hooks/useToaster";
import { HasuraUserRole } from "src/types";
import View from "./View";

type Props = {
  githubUserId: number;
  paymentRequests: Payment[];
  userInfos: UserPayoutSettingsFragment;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, userInfos }: Props) {
  const { T } = useIntl();

  const showToaster = useShowToaster();

  const [markInvoiceAsReceived] = useHasuraMutation<MarkInvoiceAsReceivedMutation>(
    MARK_INVOICE_AS_RECEIVED,
    HasuraUserRole.RegisteredUser,
    {
      variables: { paymentReferences: paymentRequests.map(p => ({ projectId: p.project?.id || "", paymentId: p.id })) },
      onCompleted: () => showToaster(T("invoiceSubmission.toaster.success")),
      onError: () => showToaster(T("invoiceSubmission.toaster.error"), { isError: true }),
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
    }
  );

  return <View {...{ githubUserId, paymentRequests, markInvoiceAsReceived, userInfos }} />;
}

const MARK_INVOICE_AS_RECEIVED = gql`
  mutation markInvoiceAsReceived($paymentReferences: [PaymentReference!]!) {
    markInvoiceAsReceived(paymentReferences: $paymentReferences)
  }
`;
