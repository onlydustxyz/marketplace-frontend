import { cn } from "src/utils/cn";

import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useBillingStatus } from "hooks/users/use-billing-status/use-billing-status";

import { TProfileStatus } from "./profile-status.types";

export function ProfileStatus({ status, hasValidBillingProfile }: TProfileStatus.Props) {
  const { statusMapping, isWarning, isError, isSuccess } = useBillingStatus({
    status,
    hasValidBillingProfile,
  });

  if (!statusMapping) {
    return null;
  }

  return (
    <Tag>
      <Icon
        className={cn({ "text-orange-500": isWarning, "text-spacePurple-500": isSuccess, "text-red-500": isError })}
        {...statusMapping.icon}
        size={14}
      />
      <Translate token={statusMapping.label} />
    </Tag>
  );
}
