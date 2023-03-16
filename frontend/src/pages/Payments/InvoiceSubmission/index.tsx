import { gql } from "@apollo/client";
import { SliderButton } from "@typeform/embed-react";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { Payment } from "src/components/PayoutTable/Line";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";
import { formatDate } from "src/utils/date";
import { pretty } from "src/utils/id";
import { formatList } from "src/utils/list";
import { formatMoneyAmount } from "src/utils/money";
import {
  GetPaymentRequestsQuery,
  MarkInvoiceAsReceivedMutationVariables,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { useShowToaster } from "src/hooks/useToaster";
import { HasuraUserRole } from "src/types";
import { cloneDeep } from "lodash";
import { GET_PAYMENTS_QUERY } from "..";

type Props = {
  githubUserId: number;
  userInfos: UserPayoutSettingsFragment;
  paymentRequests: Payment[];
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, ...props }: Props) {
  const { T } = useIntl();

  const showToaster = useShowToaster();

  const [markInvoiceAsReceived] = useHasuraMutation(MARK_INVOICE_AS_RECEIVED, HasuraUserRole.RegisteredUser, {
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
  });

  return (
    <Card padded={false} className="py-5 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-walsheim text-white">
          <span className="text-lg font-medium">{T("invoiceSubmission.title")}</span>
          <span className="text-sm font-normal">{T("invoiceSubmission.text", { count: paymentRequests.length })}</span>
        </div>
        <SliderButton
          id="Eg67bRev"
          iframeProps={{ title: T("invoiceSubmission.sidePanel.title") }}
          opacity={100}
          position="right"
          autoClose={true}
          medium="snippet"
          hidden={buildHiddenFields({ ...props, paymentRequests, githubUserId })}
          transitiveSearchParams={true}
          as="div"
          onSubmit={() => markInvoiceAsReceived()}
        >
          <Button width={Width.Full}>
            <Attachment2 className="text-xl" />
            {T("invoiceSubmission.submitButton")}
          </Button>
        </SliderButton>
      </div>
    </Card>
  );
}

export function buildHiddenFields({
  githubUserId,
  paymentRequests,
  userInfos,
}: Omit<Props, "projectId">): Record<string, string> {
  return {
    github_id: githubUserId.toString(),
    request_ids: paymentRequests.map(p => p.id).join(","),
    pretty_requests: formatList(
      paymentRequests.map(
        p =>
          `#${pretty(p.id)} - ${formatDate(new Date(p.requestedAt))} (${formatMoneyAmount(
            p.amount.value,
            p.amount.currency
          )})`
      )
    ),
    company_name: userInfos.identity.Company.name,
    company_number: userInfos.identity.Company.identification_number,
    first_name: userInfos.identity.Company.owner.firstname,
    last_name: userInfos.identity.Company.owner.lastname,
    street_address: userInfos.location.address,
    zip_code: userInfos.location.post_code,
    city: userInfos.location.city,
    country: userInfos.location.country,
    payout_info: userInfos.payoutSettings.EthTransfer?.Address
      ? `ETH Address: ${userInfos.payoutSettings.EthTransfer?.Address}`
      : userInfos.payoutSettings.EthTransfer?.Name
      ? `ENS Domain: ${userInfos.payoutSettings.EthTransfer?.Name}`
      : formatList([
          `IBAN: ${userInfos.payoutSettings.WireTransfer?.IBAN}`,
          `BIC: ${userInfos.payoutSettings.WireTransfer?.BIC}`,
        ]),
    total_amount: formatMoneyAmount(
      paymentRequests.map(p => p.amount.value).reduce((acc, amount) => acc + amount, 0),
      paymentRequests.at(0)?.amount.currency
    ),
  };
}

const MARK_INVOICE_AS_RECEIVED = gql`
  mutation markInvoiceAsReceived($paymentReferences: [PaymentReference!]!) {
    markInvoiceAsReceived(paymentReferences: $paymentReferences)
  }
`;
