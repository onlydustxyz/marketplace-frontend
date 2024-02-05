import { TStatus } from "app/migration/settings/billing/component/status/status.types";
import { useBillingStatus } from "app/migration/settings/billing/hooks/useBillingStatus";

import { cn } from "src/utils/cn";

import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

export function Status({ status, hasValidBillingProfile }: TStatus.Props) {
  const { statusMapping, isWarning, isError, isSuccess } = useBillingStatus(hasValidBillingProfile, status);

  if (!statusMapping) {
    return null;
  }

  return (
    <Tag>
      <Icon
        className={cn({ "text-orange-500": isWarning, "text-spacePurple-500": isSuccess, "text-red-500": isError })}
        remixName={statusMapping.icon}
        size={14}
      />
      <Translate token={statusMapping.label} />
    </Tag>
  );
}
