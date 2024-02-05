import { components } from "src/__generated/api";
import { PaymentStatus } from "src/types";
import { compareDateToNow, getFormattedDateToLocaleDateString } from "src/utils/date";

import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

type Props = {
  status: PaymentStatusUnion;
  dates?: {
    processedAt?: string | null;
    unlockDate?: string | null;
  };
};

export type PaymentStatusType = components["schemas"]["RewardPageItemResponse"]["status"];
type PaymentStatusUnion = `${PaymentStatus}`;

export default function PayoutStatus({ status, dates }: Props) {
  const statuses: Record<PaymentStatusUnion, JSX.Element> = {
    [PaymentStatus.COMPLETE]: <CompleteTag date={dates?.processedAt} />,
    [PaymentStatus.LOCKED]: <LockedTag date={dates?.unlockDate} />,
    [PaymentStatus.PENDING_INVOICE]: <InvoiceNeededTag />,
    [PaymentStatus.PENDING_SIGNUP]: <PendingSignup />,
    [PaymentStatus.PROCESSING]: <ProcessingTag />,
    [PaymentStatus.MISSING_PAYOUT_INFO]: <PayoutInfoMissingTag />,
    [PaymentStatus.PENDING_VERIFICATION]: <PendingVerificationTag />,
    [PaymentStatus.PENDING_CONTRIBUTOR]: <>toto</>,
  };
  return statuses[status];
}

const CompleteTag = ({ date }: { date: string | null | undefined }) => (
  <Tag
    size="medium"
    tooltipContent={
      <Translate
        token="v2.features.payoutStatus.processedOnDate"
        params={{
          date: date ? getFormattedDateToLocaleDateString(new Date(date)) : "",
        }}
      />
    }
  >
    <Icon remixName="ri-check-line" size={16} />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.complete.label" />
    </Typography>
  </Tag>
);

const LockedTag = ({ date }: { date: string | null | undefined }) => {
  const dateRelativeToNow = compareDateToNow(date);
  let tooltipValue;

  switch (dateRelativeToNow.status) {
    case "past":
      tooltipValue = {
        token: "v2.features.payoutStatus.unlockedOnDate",
        params: { date: date ? getFormattedDateToLocaleDateString(new Date(date)) : undefined },
      };
      break;
    case "future":
      tooltipValue = {
        token: "v2.features.payoutStatus.lockedUntilDate",
        params: { date: date ? getFormattedDateToLocaleDateString(new Date(date)) : undefined },
      };
      break;
    case "invalid":
    case "today":
    default:
      tooltipValue = {
        token: "v2.features.payoutStatus.lockedUntilFurther",
        params: null,
      };
  }

  return (
    <Tag size="medium" tooltipContent={<Translate token={tooltipValue.token} params={{ ...tooltipValue.params }} />}>
      <Icon remixName="ri-lock-fill" size={16} />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.locked.label" />
      </Typography>
    </Tag>
  );
};

const ProcessingTag = () => (
  <Tag size="medium" tooltipContent={<Translate token="v2.features.payoutStatus.processing.tooltip" />}>
    <Icon remixName="ri-time-line" size={16} />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.processing.label" />
    </Typography>
  </Tag>
);

const PendingSignup = () => (
  <Tag size="medium" tooltipContent={<Translate token="v2.features.payoutStatus.pendingSignup.tooltip" />}>
    <Icon remixName="ri-error-warning-line" size={16} />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.pendingSignup.label" />
    </Typography>
  </Tag>
);

const InvoiceNeededTag = () => (
  <Tag
    size="medium"
    borderColor="multi-color"
    tooltipContent={<Translate token="v2.features.payoutStatus.invoicePending.tooltip" />}
  >
    <Icon remixName="ri-loader-2-line" size={16} />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.invoicePending.label" />
    </Typography>
  </Tag>
);

const PayoutInfoMissingTag = () => (
  <Tag
    size="medium"
    borderColor="orange"
    tooltipContent={<Translate token="v2.features.payoutStatus.payoutInfoMissing.tooltip" />}
  >
    <Icon remixName="ri-error-warning-line" size={16} className="text-orange-500" />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.payoutInfoMissing.label" />
    </Typography>
    <Icon remixName="ri-arrow-right-s-line" size={16} className="text-snow" />
  </Tag>
);

const PendingVerificationTag = () => (
  <Tag
    size="medium"
    borderColor="orange"
    tooltipContent={<Translate token="v2.features.payoutStatus.pendingVerification.tooltip" />}
  >
    <Icon remixName="ri-error-warning-line" size={16} className="text-orange-500" />
    <Typography variant="body-s">
      <Translate token="v2.features.payoutStatus.pendingVerification.label" />
    </Typography>
    <Icon remixName="ri-arrow-right-s-line" size={16} className="text-snow" />
  </Tag>
);
