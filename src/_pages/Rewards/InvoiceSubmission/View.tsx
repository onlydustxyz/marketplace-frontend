import { SliderButton } from "@typeform/embed-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import MeApi from "src/api/me";
import { UseGetUserMeResponse } from "src/api/me/queries";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Attachment2 from "src/icons/Attachment2";
import { Currency } from "src/types";
import { formatDate } from "src/utils/date";
import { pretty } from "src/utils/id";
import { formatList } from "src/utils/list";
import { formatMoneyAmount } from "src/utils/money";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { MyBillingProfileType, MyRewardsPendingInvoiceType } from ".";

type Props = {
  githubUserId: number;
  paymentRequests: MyRewardsPendingInvoiceType["rewards"];
  billingProfile?: MyBillingProfileType;
};

export default function InvoiceSubmission({ paymentRequests, githubUserId, billingProfile }: Props) {
  const { T } = useIntl();
  const { user } = useCurrentUser();

  const showToaster = useShowToaster();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const onSliderSubmit = useCallback(() => setIsSubmitted(true), []);
  const onSliderClose = useCallback(() => {
    setIsClosed(true);
  }, []);

  const hiddenFields = useMemo(
    () => buildHiddenFields({ paymentRequests, githubUserId, billingProfile, user }),
    [paymentRequests, githubUserId, billingProfile, user]
  );

  const { mutate: markInvoiceAsReceived } = MeApi.mutations.useMarkInvoicesAsReceived({
    options: {
      onSuccess: () => {
        showToaster(T("invoiceSubmission.toaster.success"));
      },
    },
  });

  useEffect(() => {
    if (isClosed && isSubmitted) {
      markInvoiceAsReceived(undefined);
      setIsClosed(false);
      setIsSubmitted(false);
    }
  }, [isClosed, isSubmitted, markInvoiceAsReceived]);

  return (
    <Card padded={false} className="bg-noise-light px-6 py-5 hover:bg-right">
      <div className="flex flex-row gap-6">
        <div className="flex flex-1 flex-col gap-1 font-walsheim text-white">
          <span className="text-lg font-semibold">
            <InfoIcon className="mb-1 mr-1 inline-flex h-4 w-4 text-orange-500" />

            {T("invoiceSubmission.title")}
          </span>
          <span className="text-sm font-normal text-spaceBlue-200">
            {T("invoiceSubmission.text", { count: paymentRequests.length })}
          </span>
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
  billingProfile,
  user,
}: Props & { user?: UseGetUserMeResponse }): Record<string, string> {
  return {
    github_id: githubUserId.toString(),
    request_ids: paymentRequests.map(p => p.id).join(","),
    pretty_requests: formatList(
      paymentRequests.map(
        p =>
          `#${pretty(p.id)} - ${formatDate(new Date(p.requestedAt))} (${formatMoneyAmount({
            amount: p.amount.total,
            currency: p.amount.currency,
          })} ${
            p.amount.currency !== Currency.USD ? "~ " + p.amount.dollarsEquivalent?.toFixed(2) + " " + Currency.USD : ""
          })`
      )
    ),
    company_name: billingProfile?.name || "",
    company_number: billingProfile?.euVATNumber || "",
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    address: billingProfile?.address || "",
    total_amount: formatMoneyAmount({
      amount: paymentRequests.map(p => p.amount.dollarsEquivalent ?? 0).reduce((acc, amount) => acc + amount, 0),
      currency: Currency.USD,
    }),
    env: config.ENVIRONMENT ?? "",
  };
}
