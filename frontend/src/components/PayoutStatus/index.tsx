import Tag, { TagBorderColor, TagIcon, TagIconColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";

type Props = {
  status: PaymentStatus;
  payoutInfoMissing: boolean;
};

export default function PayoutStatus({ status, payoutInfoMissing }: Props) {
  return (
    <Tag
      label={getStatusLabel(status, payoutInfoMissing)}
      size={TagSize.Medium}
      icon={getStatusIcon(status, payoutInfoMissing)}
      iconColor={payoutInfoMissing ? TagIconColor.Pink : TagIconColor.Grey}
      borderColor={payoutInfoMissing ? TagBorderColor.MultiColor : TagBorderColor.Grey}
    ></Tag>
  );
}

const getStatusLabel = (status: PaymentStatus, payoutInfoMissing: boolean) => {
  const { T } = useIntl();

  if (payoutInfoMissing) {
    return T("payment.status.missing");
  }

  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return T("payment.status.processing");
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
