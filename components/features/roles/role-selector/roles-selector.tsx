import { useMemo } from "react";

import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Dropdown } from "components/ds/dropdown/dropdown";
import { TDropdown } from "components/ds/dropdown/dropdown.types";
import { TRolesSelector } from "components/features/roles/role-selector/roles-selector.types";
import { RoleTag } from "components/features/roles/role-tag/role-tag";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

export function RolesSelector({ activeRole, billingProfileId, onSelect }: TRolesSelector.Props) {
  // TODO waiting for backend mutation
  const { T } = useIntl();

  useMutationAlert({
    // mutation: rest,
    success: {
      // TODO add translation file
      message: T("v2.features.role.selection.success"),
    },
    error: {
      default: true,
    },
  });

  function onSelectRole(type: TRolesSelector.roleUnion) {
    if (billingProfileId) {
      // mutate({ billingProfileId: id, type: type });
    }

    onSelect?.(type);
  }

  const menu: TDropdown.Item[] = useMemo(
    () => [
      {
        key: TRolesSelector.roleType.Admin,
        children: <Translate token="v2.features.roles.roles.admin" />,
        startContent: <Icon remixName="ri-star-line" size={16} />,
        onClick: () => onSelectRole(TRolesSelector.roleType.Admin),
        active: activeRole === TRolesSelector.roleType.Admin,
      },
      {
        key: TRolesSelector.roleType.Member,
        children: <Translate token="v2.features.roles.roles.member" />,
        startContent: <Icon remixName="ri-team-line" size={16} />,
        onClick: () => onSelectRole(TRolesSelector.roleType.Member),
        active: activeRole === TRolesSelector.roleType.Member,
      },
    ],
    []
  );

  const role = useMemo(() => {
    const iconName: RemixIconsName = activeRole === TRolesSelector.roleType.Admin ? "ri-star-line" : "ri-team-line";
    return {
      icon: { remixName: iconName },
      type: activeRole,
    };
  }, [activeRole]);

  return (
    <Dropdown items={menu}>
      <RoleTag role={role} />
    </Dropdown>
  );
}
