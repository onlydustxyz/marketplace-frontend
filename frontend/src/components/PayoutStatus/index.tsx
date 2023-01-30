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
      {buildTag(status, payoutInfoMissing)}
    </div>
  );
}

const buildTag = (status: PaymentStatus, payoutInfoMissing: boolean) => {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return payoutInfoMissing ? tagPayoutInfoMissing() : tagProcessing();
    case PaymentStatus.ACCEPTED:
      return tagComplete();
  }
};

const tagComplete = () => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        label={T("payment.status.complete")}
        size={TagSize.Medium}
        icon={TagIcon.Check}
        iconColor={TagIconColor.Grey}
        borderColor={TagBorderColor.Grey}
      />
      <div
        className={classNames(
          "absolute z-10 translate-y-10 invisible group-hover/payout-status:visible flex justify-center w-36"
        )}
      >
        <Tooltip>{T("payment.status.tooltip.complete")}</Tooltip>
      </div>
    </>
  );
};

const tagProcessing = () => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        label={T("payment.status.processing")}
        size={TagSize.Medium}
        icon={TagIcon.Time}
        iconColor={TagIconColor.Grey}
        borderColor={TagBorderColor.Grey}
      />
      <div
        className={classNames(
          "absolute z-10 translate-y-10 invisible group-hover/payout-status:visible flex justify-center w-44"
        )}
      >
        <Tooltip>{T("payment.status.tooltip.processing")}</Tooltip>
      </div>
    </>
  );
};

const tagPayoutInfoMissing = () => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        label={T("payment.status.payoutInfoMissing")}
        size={TagSize.Medium}
        icon={TagIcon.Warning}
        iconColor={TagIconColor.Pink}
        borderColor={TagBorderColor.MultiColor}
        whitespaceNoWrap={true}
      />
      <div
        className={classNames(
          "absolute z-10 translate-y-10 invisible group-hover/payout-status:visible flex justify-center w-52"
        )}
      >
        <Tooltip>{T("payment.status.tooltip.payoutInfoMissing")}</Tooltip>
      </div>
    </>
  );
};
