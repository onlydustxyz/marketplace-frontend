import { useMemo } from "react";

import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TBillingProfileTag } from "./billing-profile-tag.types";

export function BillingProfileTag({ profile, fallback }: TBillingProfileTag.Props) {
  const color = useMemo(() => {
    if (profile?.hasError) {
      return "red";
    }
    if (profile?.hasWarning) {
      return "orange";
    }
    return "grey";
  }, [profile]);

  if (!profile) {
    return (
      <Tag size="medium" borderColor="orange" className="inline-flex">
        <Icon size={16} remixName="ri-error-warning-line" className="text-orange-500" />
        <Typography variant="body-s">
          {fallback || <Translate token="v2.features.billingsProfile.tag.noBillingProfile" />}
        </Typography>
        <Icon remixName="ri-arrow-down-s-line" size={16} />
      </Tag>
    );
  }
  return (
    <Tag size="medium" borderColor={color} className="inline-flex">
      <Icon size={16} {...profile.icon} color={color} />
      <Typography variant="body-s">{profile.name}</Typography>
      <Icon remixName="ri-arrow-down-s-line" size={16} />
    </Tag>
  );
}
