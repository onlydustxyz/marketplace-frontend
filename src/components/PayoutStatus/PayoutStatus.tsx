import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { withTooltip } from "src/components/Tooltip";
import { components } from "src/__generated/api";
import { compareDateToNow, getFormattedDateToLocaleDateString } from "src/utils/date";
import LockFill from "src/icons/LockFill";

type Props = {
  status: PaymentStatusUnion;
  date?: string | null;
};

export type PaymentStatusType = components["schemas"]["RewardPageItemResponse"]["status"];
type PaymentStatusUnion = `${PaymentStatus}`;

export default function PayoutStatus({ status, date }: Props) {
  const statuses: Record<PaymentStatusUnion, JSX.Element> = {
    // TODO handle complete date once backend ready
    [PaymentStatus.COMPLETE]: <CompleteTag />,
    [PaymentStatus.LOCKED]: <LockedTag date={date} />,
    [PaymentStatus.PENDING_INVOICE]: <InvoiceNeededTag />,
    [PaymentStatus.PENDING_SIGNUP]: <PendingSignup />,
    [PaymentStatus.PROCESSING]: <ProcessingTag />,
    [PaymentStatus.MISSING_PAYOUT_INFO]: <PayoutInfoMissingTag />,
  };
  return statuses[status];
}

const CompleteTag = () => {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} {...withTooltip(T("reward.status.tooltip.complete"), { className: "w-36" })}>
      <CheckLine className="text-greyscale-50" />
      <span className="font-normal text-greyscale-50">{T("reward.status.complete")}</span>
    </Tag>
  );
};

const LockedTag = ({ date }: { date: string | null | undefined }) => {
  const { T } = useIntl();
  const dateRelativeToNow = compareDateToNow(date);
  let tooltipValue;

  switch (dateRelativeToNow.status) {
    case "past":
      tooltipValue = T("reward.status.tooltip.unlockedOnDate", {
        date: date ? getFormattedDateToLocaleDateString(new Date(date)) : undefined,
      });
      break;
    case "future":
      tooltipValue = T("reward.status.tooltip.lockedUntilDate", {
        date: date ? getFormattedDateToLocaleDateString(new Date(date)) : undefined,
      });
      break;
    case "invalid":
    case "today":
    default:
      tooltipValue = T("reward.status.tooltip.lockedUntilFurther");
  }

  return (
    <Tag size={TagSize.Medium} {...withTooltip(tooltipValue, { className: "w-36" })}>
      <LockFill className="text-greyscale-50" />
      <span className="font-normal text-greyscale-50">{T("reward.status.locked")}</span>
    </Tag>
  );
};

const ProcessingTag = () => {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} {...withTooltip(T("reward.status.tooltip.processing"), { className: "w-44" })}>
      <Time className="text-greyscale-50" />
      <span className="font-normal text-greyscale-50">{T("reward.status.processing")}</span>
    </Tag>
  );
};

const PendingSignup = () => {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} {...withTooltip(T("reward.status.tooltip.pending"), { className: "w-44" })}>
      <ErrorWarningLine className="text-pink-500" />
      <span className="font-normal text-greyscale-50">{T("reward.status.pendingSignup")}</span>
    </Tag>
  );
};

const InvoiceNeededTag = () => {
  const { T } = useIntl();

  return (
    <Tag
      size={TagSize.Medium}
      borderColor={TagBorderColor.MultiColor}
      {...withTooltip(T("reward.status.tooltip.invoicePending"), { className: "w-64" })}
    >
      <ErrorWarningLine className="text-pink-500" />
      <span className="whitespace-nowrap font-normal text-greyscale-50">{T("reward.status.invoicePending")}</span>
    </Tag>
  );
};

const PayoutInfoMissingTag = () => {
  const { T } = useIntl();

  return (
    <Tag
      size={TagSize.Medium}
      borderColor={TagBorderColor.Orange}
      {...withTooltip(T("reward.status.tooltip.payoutInfoMissing"), { className: "w-52" })}
    >
      <ErrorWarningLine className="text-orange-500" />
      <span className="whitespace-nowrap font-normal text-greyscale-50">{T("reward.status.payoutInfoMissing")}</span>
    </Tag>
  );
};
