import { SliderButton } from "@typeform/embed-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { Reward } from "src/components/UserRewardTable/Line";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";
import { formatDate } from "src/utils/date";
import { pretty } from "src/utils/id";
import { formatList } from "src/utils/list";
import { formatMoneyAmount } from "src/utils/money";
import { UserPayoutSettingsFragment } from "src/__generated/graphql";

type Props = {
  githubUserId: number;
  paymentRequests: Reward[];
  markInvoiceAsReceived: () => void;
  userInfos: UserPayoutSettingsFragment;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, markInvoiceAsReceived, userInfos }: Props) {
  const { T } = useIntl();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const onSliderSubmit = useCallback(() => setIsSubmitted(true), []);
  const onSliderClose = useCallback(() => {
    setIsClosed(true);
  }, []);
  const hiddenFields = useMemo(
    () => buildHiddenFields({ paymentRequests: paymentRequests, githubUserId, userInfos }),
    [paymentRequests, githubUserId, userInfos]
  );

  useEffect(() => {
    if (isClosed && isSubmitted) {
      markInvoiceAsReceived();
      setIsClosed(false);
      setIsSubmitted(false);
    }
  }, [isClosed, isSubmitted, markInvoiceAsReceived]);

  return (
    <Card padded={false} className="px-6 py-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-walsheim text-white">
          <span className="text-lg font-medium">{T("invoiceSubmission.title")}</span>
          <span className="text-sm font-normal">{T("invoiceSubmission.text", { count: paymentRequests.length })}</span>
        </div>
        <MemoizedSlider onSubmit={onSliderSubmit} onClose={onSliderClose} hiddenFields={hiddenFields} />
      </div>
    </Card>
  );
}

interface SliderProps {
  onSubmit: () => void;
  onClose: () => void;
  hiddenFields: Record<string, string>;
}

function Slider({ onSubmit, onClose, hiddenFields }: SliderProps) {
  const { T } = useIntl();
  return (
    <SliderButton
      id="Eg67bRev"
      iframeProps={{ title: T("invoiceSubmission.sidePanel.title") }}
      opacity={100}
      autoClose={100}
      position="right"
      medium="snippet"
      hidden={hiddenFields}
      transitiveSearchParams={true}
      as="div"
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <Button width={Width.Full}>
        <Attachment2 className="text-xl" />
        {T("invoiceSubmission.submitButton")}
      </Button>
    </SliderButton>
  );
}

const MemoizedSlider = memo(Slider);

export function buildHiddenFields({
  githubUserId,
  paymentRequests: paymentRequests,
  userInfos,
}: Omit<Props, "projectId" | "markInvoiceAsReceived">): Record<string, string> {
  return {
    github_id: githubUserId.toString(),
    request_ids: paymentRequests.map(p => p.id).join(","),
    pretty_requests: formatList(
      paymentRequests.map(
        p =>
          `#${pretty(p.id)} - ${formatDate(new Date(p.requestedAt))} (${formatMoneyAmount({
            amount: p.amount.value,
            currency: p.amount.currency,
          })})`
      )
    ),
    company_name: userInfos.companyName || "",
    company_number: userInfos.companyIdentificationNumber || "",
    first_name: userInfos.firstname || "",
    last_name: userInfos.lastname || "",
    street_address: userInfos.address || "",
    zip_code: userInfos.postCode || "",
    city: userInfos.city || "",
    country: userInfos.country || "",
    payout_info: userInfos.ethWallet?.startsWith("0x")
      ? `ETH Address: ${userInfos.ethWallet}`
      : userInfos.ethWallet
      ? `ENS Domain: ${userInfos.ethWallet}`
      : formatList([`IBAN: ${userInfos.iban}`, `BIC: ${userInfos.bic}`]),
    total_amount: formatMoneyAmount({
      amount: paymentRequests.map(p => p.amount.value).reduce((acc, amount) => acc + amount, 0),
      currency: paymentRequests.at(0)?.amount.currency,
    }),
    env: config.ENVIRONMENT,
  };
}
