import { PaymentStatus } from "src/types";
import { compareDateToNow } from "src/utils/date";

import { Tag } from "components/ds/tag/tag";
import { getStatusConfig } from "components/features/payout-status/status-config/status-config";
import { TStatusTag } from "components/features/payout-status/status-tag/status-tag.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function StatusTag({ status, date, className, isBillingError }: TStatusTag.Props) {
  const dateRelativeToNow = date ? compareDateToNow(date) : undefined;
  const { icon, labelToken, tooltipToken, tooltipParams, borderColor, iconClassName } = getStatusConfig({
    status,
    dateRelativeToNow,
    date,
    isBillingError,
  });

  return (
    <Tag
      size="medium"
      borderColor={borderColor}
      tooltipContent={<Translate token={tooltipToken} params={tooltipParams} />}
      className={className}
    >
      <Icon remixName={icon} size={16} className={iconClassName} />
      <Typography variant="body-s">
        <Translate token={labelToken} />
      </Typography>
      {status === PaymentStatus.PAYOUT_INFO_MISSING || status === PaymentStatus.PENDING_VERIFICATION ? (
        <Icon remixName="ri-arrow-right-s-line" size={16} />
      ) : null}
    </Tag>
  );
}
