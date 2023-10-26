import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { withTooltip } from "src/components/Tooltip";
import { RewardStatus } from "src/pages/Rewards";
import { d } from "vitest/dist/index-5aad25c1";

type RewardStatusType = "COMPLETE" | "PENDING_INVOICE" | "PENDING_SIGNUP" | "PROCESSING";

type Props = {
  id: string;
  status: RewardStatusType;
  isProjectLeaderView?: boolean;
};

export default function PayoutStatus({ status, isProjectLeaderView = false }: Props) {
  return buildTag(status, isProjectLeaderView);
}

const buildTag = (status: RewardStatusType, isProjectLeaderView: boolean) => {
  switch (status) {
    case RewardStatus.PENDING_INVOICE:
      return InvoiceNeededTag();
    case RewardStatus.PENDING_SIGNUP:
      return PendingSignupTag();
    case RewardStatus.PROCESSING:
      return ProcessingTag();
    case RewardStatus.COMPLETE:
      return CompleteTag();
    // TODO WAITNING FOR API TO ADD THIS TYPE
    // case RewardStatus.PAYOUT_INFO_MISSING:
    //   return PayoutInfoMissingTag(isProjectLeaderView);
    default:
      return ProcessingTag();
  }
};

const CompleteTag = () => {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} {...withTooltip(T("reward.status.tooltip.complete"), { className: "w-36" })}>
      <CheckLine className="text-greyscale-50" />
      <span className="font-normal text-greyscale-50">{T("reward.status.complete")}</span>
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

const PayoutInfoMissingTag = (isProjectLeaderView: boolean) => {
  const { T } = useIntl();

  return (
    <Tag
      size={TagSize.Medium}
      borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
      {...withTooltip(
        isProjectLeaderView ? T("reward.status.tooltip.pending") : T("reward.status.tooltip.payoutInfoMissing"),
        { className: "w-52" }
      )}
    >
      <ErrorWarningLine className="text-pink-500" />
      <span className="whitespace-nowrap font-normal text-greyscale-50">
        {isProjectLeaderView ? T("reward.status.pending") : T("reward.status.payoutInfoMissing")}
      </span>
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

const PendingSignupTag = () => {
  const { T } = useIntl();

  return (
    <Tag
      size={TagSize.Medium}
      borderColor={TagBorderColor.MultiColor}
      {...withTooltip(T("reward.status.tooltip.signupPending"), { className: "w-64" })}
    >
      <ErrorWarningLine className="text-pink-500" />
      <span className="whitespace-nowrap font-normal text-greyscale-50">{T("reward.status.signupPending")}</span>
    </Tag>
  );
};
