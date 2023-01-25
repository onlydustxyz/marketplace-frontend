import classNames from "classnames";
import Tag, { TagBorderColor, TagIcon, TagIconColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";
import Tooltip from "../Tooltip";

type Props = {
  status: PaymentStatus;
  payoutInfoMissing: boolean;
};

export default function PayoutStatus({ status, payoutInfoMissing }: Props) {
  return (
    <div className="relative group/payout-status flex flex-row justify-center">
      <Tag
        label={getStatusLabel(status, payoutInfoMissing)}
        size={TagSize.Medium}
        icon={getStatusIcon(status, payoutInfoMissing)}
        iconColor={payoutInfoMissing ? TagIconColor.Pink : TagIconColor.Grey}
        borderColor={payoutInfoMissing ? TagBorderColor.MultiColor : TagBorderColor.Grey}
      />
      <div
        className={classNames(
          "absolute z-10 translate-y-10 invisible group-hover/payout-status:visible flex justify-center",
          {
            "w-52": payoutInfoMissing,
            "w-44": !payoutInfoMissing && status === PaymentStatus.WAITING_PAYMENT,
            "w-36": !payoutInfoMissing && status === PaymentStatus.ACCEPTED,
          }
        )}
      >
        <Tooltip>{getTooltipText(status, payoutInfoMissing)}</Tooltip>
      </div>
    </div>
  );
}

const getStatusLabel = (status: PaymentStatus, payoutInfoMissing: boolean) => {
  const { T } = useIntl();

  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return payoutInfoMissing ? T("payment.status.payoutInfoMissing") : T("payment.status.processing");
    case PaymentStatus.ACCEPTED:
      return T("payment.status.complete");
  }
};

const getStatusIcon = (status: PaymentStatus, payoutInfoMissing: boolean) => {
  if (payoutInfoMissing) {
    return TagIcon.Warning;
  }

  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return TagIcon.Time;
    case PaymentStatus.ACCEPTED:
      return TagIcon.Check;
  }
};

const getTooltipText = (status: PaymentStatus, payoutInfoMissing: boolean) => {
  const { T } = useIntl();

  if (payoutInfoMissing) {
    return T("payment.status.tooltip.payoutInfoMissing");
  }

  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return T("payment.status.tooltip.processing");
    case PaymentStatus.ACCEPTED:
      return T("payment.status.tooltip.complete");
  }
};
