import classNames from "classnames";
import Tag, { TagBackgroundColor, TagBorderColor, TagIcon, TagIconColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";
import Tooltip from "../Tooltip";

type Props = {
  status: PaymentStatus;
  payoutInfoMissing: boolean;
  isProjectLeaderView?: boolean;
};

export default function PayoutStatus({ status, payoutInfoMissing, isProjectLeaderView = false }: Props) {
  return (
    <div className="relative group/payout-status flex flex-row justify-center">
      {buildTag(status, payoutInfoMissing, isProjectLeaderView)}
    </div>
  );
}

const buildTag = (status: PaymentStatus, payoutInfoMissing: boolean, isProjectLeaderView: boolean) => {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return payoutInfoMissing ? tagPayoutInfoMissing(isProjectLeaderView) : tagProcessing();
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

const tagPayoutInfoMissing = (isProjectLeaderView: boolean) => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        label={isProjectLeaderView ? T("payment.status.pending") : T("payment.status.payoutInfoMissing")}
        size={TagSize.Medium}
        icon={TagIcon.Warning}
        iconColor={TagIconColor.Pink}
        borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
        backgroundColor={TagBackgroundColor.SpaceBlueOpaque}
        whitespaceNoWrap={true}
      />
      <div
        className={classNames(
          "absolute z-10 translate-y-10 invisible group-hover/payout-status:visible flex justify-center w-52"
        )}
      >
        <Tooltip>
          {isProjectLeaderView ? T("payment.status.tooltip.pending") : T("payment.status.tooltip.payoutInfoMissing")}
        </Tooltip>
      </div>
    </>
  );
};
