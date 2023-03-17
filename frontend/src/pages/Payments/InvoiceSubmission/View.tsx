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
import { UserPayoutSettingsFragment } from "src/__generated/graphql";

type Props = {
  githubUserId: number;
  paymentRequests: Payment[];
  markInvoiceAsReceived: () => void;
  userInfos: UserPayoutSettingsFragment;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, markInvoiceAsReceived, userInfos }: Props) {
  const { T } = useIntl();

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
          hidden={buildHiddenFields({ paymentRequests, githubUserId, userInfos })}
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
}: Omit<Props, "projectId" | "markInvoiceAsReceived">): Record<string, string> {
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
