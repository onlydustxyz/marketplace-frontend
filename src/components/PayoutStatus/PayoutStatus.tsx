import { components } from "src/__generated/api";
import { PaymentStatus } from "src/types";
import { compareDateToNow, getFormattedDateToLocaleDateString } from "src/utils/date";

import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
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
  <Tooltip
    content={
      <Translate
        token="v2.features.payoutStatus.processedOnDate"
        params={{
          date: date ? getFormattedDateToLocaleDateString(new Date(date)) : "",
        }}
      />
    }
  >
    <Tag size="medium">
      <Icon remixName="ri-check-line" size={16} />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.complete.label" />
      </Typography>
    </Tag>
  </Tooltip>
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
    <Tooltip content={<Translate token={tooltipValue.token} params={{ ...tooltipValue.params }} />}>
      <Tag size="medium">
        <Icon remixName="ri-lock-fill" size={16} />
        <Typography variant="body-s">
          <Translate token="v2.features.payoutStatus.locked.label" />
        </Typography>
      </Tag>
    </Tooltip>
  );
};

const ProcessingTag = () => (
  <Tooltip content={<Translate token="v2.features.payoutStatus.processing.tooltip" />}>
    <Tag size="medium">
      <Icon remixName="ri-time-line" size={16} />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.processing.label" />
      </Typography>
    </Tag>
  </Tooltip>
);

const PendingSignup = () => (
  <Tooltip content={<Translate token="v2.features.payoutStatus.pendingSignup.tooltip" />}>
    <Tag size="medium">
      <Icon remixName="ri-error-warning-line" size={16} />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.pendingSignup.label" />
      </Typography>
    </Tag>
  </Tooltip>
);

const InvoiceNeededTag = () => (
  <Tooltip content={<Translate token="v2.features.payoutStatus.invoicePending.tooltip" />}>
    <Tag size="medium" borderColor="multi-color">
      <Icon remixName="ri-loader-2-line" size={16} />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.invoicePending.label" />
      </Typography>
    </Tag>
  </Tooltip>
);

const PayoutInfoMissingTag = () => (
  <Tooltip content={<Translate token="v2.features.payoutStatus.payoutInfoMissing.tooltip" />}>
    <Tag size="medium" borderColor="orange">
      <Icon remixName="ri-error-warning-line" size={16} className="text-orange-500" />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.payoutInfoMissing.label" />
      </Typography>
      <Icon remixName="ri-arrow-right-s-line" size={16} className="text-snow" />
    </Tag>
  </Tooltip>
);

const PendingVerificationTag = () => (
  <Tooltip content={<Translate token="v2.features.payoutStatus.pendingVerification.tooltip" />}>
    <Tag size="medium" borderColor="orange">
      <Icon remixName="ri-error-warning-line" size={16} className="text-orange-500" />
      <Typography variant="body-s">
        <Translate token="v2.features.payoutStatus.pendingVerification.label" />
      </Typography>
      <Icon remixName="ri-arrow-right-s-line" size={16} className="text-snow" />
    </Tag>
  </Tooltip>
);
