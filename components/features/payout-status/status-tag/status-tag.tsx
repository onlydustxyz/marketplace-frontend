import { PaymentStatus } from "src/types";
import { compareDateToNow } from "src/utils/date";

import { Tag } from "components/ds/tag/tag";
import { TPayoutStatus } from "components/features/payout-status/payout-status.types";
import { useStatusConfig } from "components/features/payout-status/use-status-config";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function StatusTag({ status, date }: TPayoutStatus.StatusTagProps) {
  const dateRelativeToNow = date ? compareDateToNow(date) : undefined;
  const config = useStatusConfig({ status, dateRelativeToNow, date });

  const { icon, labelToken, tooltipToken, tooltipParams, borderColor, iconClassName } = config;

  return (
    <Tag
      size="medium"
      borderColor={borderColor as "orange" | "grey" | "multi-color"}
      tooltipContent={<Translate token={tooltipToken} params={tooltipParams} />}
    >
      <Icon remixName={icon as RemixIconsName} size={16} className={iconClassName} />
      <Typography variant="body-s">
        <Translate token={labelToken} />
      </Typography>
      {status === PaymentStatus.MISSING_PAYOUT_INFO || status === PaymentStatus.PENDING_VERIFICATION ? (
        <Icon remixName="ri-arrow-right-s-line" size={16} />
      ) : null}
    </Tag>
  );
}
