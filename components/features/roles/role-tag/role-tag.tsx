import { Spinner } from "src/components/Spinner/Spinner";

import { Tag } from "components/ds/tag/tag";
import { TRoleTag } from "components/features/roles/role-tag/role-tag.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RoleTag({ role, fallback, clickable = true, isLoading }: TRoleTag.Props) {
  if (isLoading) {
    return (
      <Tag size="medium" borderColor="grey" className="inline-flex">
        <Spinner className="h-4 w-4" />
      </Tag>
    );
  }

  if (!role) {
    return (
      <Tag size="medium" borderColor="orange" className="inline-flex">
        <Icon size={16} remixName="ri-error-warning-line" className="text-orange-500" />
        <Typography variant="body-s">
          {fallback || <Translate token="v2.pages.settings.billing.coworkers.table.roles.empty" />}
        </Typography>
        <Icon remixName="ri-arrow-down-s-line" size={16} />
      </Tag>
    );
  }

  return (
    <Tag size="medium" borderColor="grey" className="inline-flex">
      <Icon size={16} {...role.icon} />
      <Typography variant="body-s">{role.type}</Typography>
      {clickable ? <Icon remixName="ri-arrow-down-s-line" size={16} /> : null}
    </Tag>
  );
}
