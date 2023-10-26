import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { withTooltip } from "src/components/Tooltip";
import { components } from "src/__generated/api";

type Props = {
  status: PaymentStatus;
};

export type PaymentStatusType = components["schemas"]["RewardPageItemResponse"]["status"];

export default function PayoutStatus({ status }: Props) {
  const statuses: Record<PaymentStatusType, JSX.Element> = {
    [PaymentStatus.COMPLETE]: <CompleteTag />,
    [PaymentStatus.PENDING_INVOICE]: <InvoiceNeededTag />,
    [PaymentStatus.PENDING_SIGNUP]: <PendingSignup />,
    [PaymentStatus.PROCESSING]: <ProcessingTag />,
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

//TODO: uncomment this when payoutInfo status is added to the API
// const PayoutInfoMissingTag = (isProjectLeaderView: boolean) => {
//   const { T } = useIntl();

//   return (
//     <Tag
//       size={TagSize.Medium}
//       borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
//       {...withTooltip(
//         isProjectLeaderView ? T("reward.status.tooltip.pending") : T("reward.status.tooltip.payoutInfoMissing"),
//         { className: "w-52" }
//       )}
//     >
//       <ErrorWarningLine className="text-pink-500" />
//       <span className="whitespace-nowrap font-normal text-greyscale-50">
//         {isProjectLeaderView ? T("reward.status.pending") : T("reward.status.payoutInfoMissing")}
//       </span>
//     </Tag>
//   );
// };
