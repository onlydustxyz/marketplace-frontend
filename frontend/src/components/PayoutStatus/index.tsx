import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import Tooltip from "../Tooltip";

type Props = {
  id: string;
  status: PaymentStatus;
  payoutInfoMissing: boolean;
  invoiceNeeded?: boolean;
  isProjectLeaderView?: boolean;
};

export default function PayoutStatus({
  id,
  status,
  payoutInfoMissing,
  isProjectLeaderView = false,
  invoiceNeeded,
}: Props) {
  return buildTag(id, status, payoutInfoMissing, isProjectLeaderView, !!invoiceNeeded);
}

const buildTag = (
  id: string,
  status: PaymentStatus,
  payoutInfoMissing: boolean,
  isProjectLeaderView: boolean,
  invoiceNeeded: boolean
) => {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return payoutInfoMissing
        ? PayoutInfoMissingTag(id, isProjectLeaderView)
        : invoiceNeeded && !isProjectLeaderView
        ? InvoiceNeededTag(id)
        : ProcessingTag(id);
    case PaymentStatus.ACCEPTED:
      return CompleteTag(id);
  }
};

const CompleteTag = (id: string) => {
  const { T } = useIntl();

  return (
    <>
      <Tag id={id} size={TagSize.Medium}>
        <CheckLine className="text-greyscale-50" />
        <span className="text-greyscale-50">{T("payment.status.complete")}</span>
      </Tag>
      <Tooltip anchorId={id}>
        <div className="w-36">{T("payment.status.tooltip.complete")}</div>
      </Tooltip>
    </>
  );
};

const ProcessingTag = (id: string) => {
  const { T } = useIntl();

  return (
    <>
      <Tag id={id} size={TagSize.Medium}>
        <Time className="text-greyscale-50" />
        <span className="text-greyscale-50">{T("payment.status.processing")}</span>
      </Tag>
      <Tooltip anchorId={id}>
        <div className="w-44">{T("payment.status.tooltip.processing")}</div>
      </Tooltip>
    </>
  );
};

const PayoutInfoMissingTag = (id: string, isProjectLeaderView: boolean) => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        id={id}
        size={TagSize.Medium}
        borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
      >
        <ErrorWarningLine className="text-pink-500" />
        <span className="text-greyscale-50 whitespace-nowrap">
          {isProjectLeaderView ? T("payment.status.pending") : T("payment.status.payoutInfoMissing")}
        </span>
      </Tag>
      <Tooltip anchorId={id}>
        <div className="w-52">
          {isProjectLeaderView ? T("payment.status.tooltip.pending") : T("payment.status.tooltip.payoutInfoMissing")}
        </div>
      </Tooltip>
    </>
  );
};

const InvoiceNeededTag = (id: string) => {
  const { T } = useIntl();

  return (
    <>
      <Tag id={id} size={TagSize.Medium} borderColor={TagBorderColor.MultiColor}>
        <ErrorWarningLine className="text-pink-500" />
        <span className="text-greyscale-50 whitespace-nowrap">{T("payment.status.invoicePending")}</span>
      </Tag>
      <Tooltip anchorId={id}>
        <div className="w-64">{T("payment.status.tooltip.invoicePending")}</div>
      </Tooltip>
    </>
  );
};
