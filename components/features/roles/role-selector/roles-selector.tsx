import { useParams } from "next/navigation";
import { useMemo } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Dropdown } from "components/ds/dropdown/dropdown";
import { TDropdown } from "components/ds/dropdown/dropdown.types";
import { TRolesSelector } from "components/features/roles/role-selector/roles-selector.types";
import { RoleTag } from "components/features/roles/role-tag/role-tag";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

export function RolesSelector({ activeRole, githubUserId, isYou }: TRolesSelector.Props) {
  const { T } = useIntl();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const {
    mutate: updateCoworkerRole,
    isPending,
    ...restUpdateCoworkerRole
  } = BillingProfilesApi.mutations.useUpdateCoworkerRole({
    params: {
      billingProfileId,
      githubUserId: `${githubUserId}`,
    },
  });

  useMutationAlert({
    mutation: restUpdateCoworkerRole,
    success: {
      message: T("v2.features.roles.mutation.success"),
    },
    error: {
      message: T("v2.features.roles.mutation.error"),
    },
  });

  function onSelectRole(type: TRolesSelector.roleUnion) {
    if (billingProfileId && githubUserId) {
      updateCoworkerRole({ role: type });
    }
  }

  const menu: TDropdown.Item[] = useMemo(
    () => [
      {
        key: TRolesSelector.roleType.Admin,
        children: <Translate token="v2.features.roles.admin" />,
        startContent: <Icon remixName="ri-star-line" size={16} />,
        onClick: () => onSelectRole(TRolesSelector.roleType.Admin),
        active: activeRole === TRolesSelector.roleType.Admin,
      },
      {
        key: TRolesSelector.roleType.Member,
        children: <Translate token="v2.features.roles.member" />,
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
      type: activeRole === TRolesSelector.roleType.Admin ? T("v2.features.roles.admin") : T("v2.features.roles.member"),
    };
  }, [activeRole]);

  if (isYou) {
    return <RoleTag role={role} clickable={false} />;
  }

  return (
    <Dropdown items={menu}>
      <RoleTag role={role} isLoading={isPending} />
    </Dropdown>
  );
}
