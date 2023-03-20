import { gql } from "@apollo/client";
import { Payment } from "src/components/PayoutTable/Line";
import { useIntl } from "src/hooks/useIntl";
import {
  GetPaymentRequestsQuery,
  MarkInvoiceAsReceivedMutation,
  MarkInvoiceAsReceivedMutationVariables,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { useShowToaster } from "src/hooks/useToaster";
import { HasuraUserRole } from "src/types";
import { cloneDeep } from "lodash";
import { GET_PAYMENTS_QUERY } from "..";
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

        const cachedQuery: GetPaymentRequestsQuery | null = cache.readQuery({
          query: GET_PAYMENTS_QUERY,
          variables: { githubUserId },
        });

        if (cachedQuery) {
          const newQuery = cloneDeep(cachedQuery);
          newQuery.paymentRequests
            .filter(p => paymentIds.includes(p.id))
            .forEach(p => (p.invoiceReceivedAt = new Date()));

          cache.writeQuery({
            query: GET_PAYMENTS_QUERY,
            data: newQuery,
            variables: { githubUserId },
          });
        }
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
