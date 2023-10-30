import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { withTooltip } from "src/components/Tooltip";
import { components } from "src/__generated/api";
import QuestionMarkLine from "src/icons/QuestionMarkLine";

type Props = {
  status: PaymentStatusUnion;
  isProjectLeaderView?: boolean;
};

interface PayoutInfoMissingTagProps {
  isProjectLeaderView?: boolean;
}

export type PaymentStatusType = components["schemas"]["RewardPageItemResponse"]["status"];
type PaymentStatusUnion = `${PaymentStatus}`;

export default function PayoutStatus({ status, isProjectLeaderView }: Props) {
  const statuses: Record<PaymentStatusUnion, JSX.Element> = {
    [PaymentStatus.COMPLETE]: <CompleteTag />,
    [PaymentStatus.PENDING_INVOICE]: <InvoiceNeededTag />,
    [PaymentStatus.PENDING_SIGNUP]: <PendingSignup />,
    [PaymentStatus.PROCESSING]: <ProcessingTag />,
    [PaymentStatus.MISSING_PAYOUT_INFO]: <PayoutInfoMissingTag isProjectLeaderView={isProjectLeaderView} />,
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
    <Tag size={TagSize.Medium} {...withTooltip(T("reward.status.tooltip.processing"), { className: "w-44" })}>
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

const PayoutInfoMissingTag: React.FC<PayoutInfoMissingTagProps> = ({ isProjectLeaderView = false }) => {
  const { T } = useIntl();

  return (
    <Tag
      size={TagSize.Medium}
      borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
      {...withTooltip(
        isProjectLeaderView
          ? T("reward.status.tooltip.payoutInfoMissingAsLeader")
          : T("reward.status.tooltip.payoutInfoMissingAsContributor"),
        { className: "w-52" }
      )}
    >
      {isProjectLeaderView ? (
        <QuestionMarkLine className="text-orange-500" />
      ) : (
        <ErrorWarningLine className="text-pink-500" />
      )}
      <span className="whitespace-nowrap font-normal text-greyscale-50">{T("reward.status.payoutInfoMissing")}</span>
    </Tag>
  );
};
