import Tag, { TagBackgroundColor, TagBorderColor, TagIcon, TagIconColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";
import Tooltip from "../Tooltip";

type Props = {
  id: string;
  status: PaymentStatus;
  payoutInfoMissing: boolean;
  isProjectLeaderView?: boolean;
};

export default function PayoutStatus({ id, status, payoutInfoMissing, isProjectLeaderView = false }: Props) {
  return buildTag(id, status, payoutInfoMissing, isProjectLeaderView);
}

const buildTag = (id: string, status: PaymentStatus, payoutInfoMissing: boolean, isProjectLeaderView: boolean) => {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return payoutInfoMissing ? tagPayoutInfoMissing(id, isProjectLeaderView) : tagProcessing(id);
    case PaymentStatus.ACCEPTED:
      return tagComplete(id);
  }
};

const tagComplete = (id: string) => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        id={id}
        label={T("payment.status.complete")}
        size={TagSize.Medium}
        icon={TagIcon.Check}
        iconColor={TagIconColor.Grey}
        borderColor={TagBorderColor.Grey}
      />
      <Tooltip anchorId={id}>
        <div className="w-36">{T("payment.status.tooltip.complete")}</div>
      </Tooltip>
    </>
  );
};

const tagProcessing = (id: string) => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        id={id}
        label={T("payment.status.processing")}
        size={TagSize.Medium}
        icon={TagIcon.Time}
        iconColor={TagIconColor.Grey}
        borderColor={TagBorderColor.Grey}
      />
      <Tooltip anchorId={id}>
        <div className="w-44">{T("payment.status.tooltip.processing")}</div>
      </Tooltip>
    </>
  );
};

const tagPayoutInfoMissing = (id: string, isProjectLeaderView: boolean) => {
  const { T } = useIntl();

  return (
    <>
      <Tag
        id={id}
        label={isProjectLeaderView ? T("payment.status.pending") : T("payment.status.payoutInfoMissing")}
        size={TagSize.Medium}
        icon={TagIcon.Warning}
        iconColor={TagIconColor.Pink}
        borderColor={isProjectLeaderView ? TagBorderColor.Grey : TagBorderColor.MultiColor}
        backgroundColor={TagBackgroundColor.SpaceBlueOpaque}
        whitespaceNoWrap={true}
      />
      <Tooltip anchorId={id}>
        <div className="w-52">
          {isProjectLeaderView ? T("payment.status.tooltip.pending") : T("payment.status.tooltip.payoutInfoMissing")}
        </div>
      </Tooltip>
    </>
  );
};
