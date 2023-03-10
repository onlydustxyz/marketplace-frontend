import { SliderButton } from "@typeform/embed-react";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { Payment } from "src/components/PayoutTable/Line";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";
import { pretty } from "src/utils/id";
import { formatList } from "src/utils/list";
import { formatMoneyAmount } from "src/utils/money";
import { UserPayoutSettingsFragment } from "src/__generated/graphql";

type Props = {
  githubUserId: number;
  userInfos: UserPayoutSettingsFragment;
  paymentRequests: Payment[];
};

export default function InvoiceSubmission({ paymentRequests, ...props }: Props) {
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
          hidden={buildHiddenFields({ ...props, paymentRequests })}
          transitiveSearchParams={true}
          as="div"
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

export function buildHiddenFields({ githubUserId, paymentRequests, userInfos }: Props): Record<string, string> {
  return {
    githubID: githubUserId.toString(),
    requestIDs: formatList(
      paymentRequests.map(p => `${pretty(p.id)} (${formatMoneyAmount(p.amount.value, p.amount.currency)})`)
    ),
    companyName: userInfos.identity.Company.name,
    companyNumber: userInfos.identity.Company.identification_number,
    firstName: userInfos.identity.Company.owner.firstname,
    lastName: userInfos.identity.Company.owner.lastname,
    streetAddress: userInfos.location.address,
    zipCode: userInfos.location.post_code,
    city: userInfos.location.city,
    country: userInfos.location.country,
    payoutInfo: userInfos.payoutSettings.EthTransfer?.Address
      ? `ETH Address: ${userInfos.payoutSettings.EthTransfer?.Address}`
      : userInfos.payoutSettings.EthTransfer?.Name
      ? `ENS Domain: ${userInfos.payoutSettings.EthTransfer?.Name}`
      : formatList([
          `IBAN: ${userInfos.payoutSettings.WireTransfer?.IBAN}`,
          `BIC: ${userInfos.payoutSettings.WireTransfer?.BIC}`,
        ]),
    totalAmount: formatMoneyAmount(
      paymentRequests.map(p => p.amount.value).reduce((acc, amount) => acc + amount, 0),
      paymentRequests.at(0)?.amount.currency
    ),
  };
}
