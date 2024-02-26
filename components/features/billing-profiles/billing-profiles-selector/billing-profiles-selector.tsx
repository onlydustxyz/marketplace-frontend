import { useMemo } from "react";

import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Dropdown } from "components/ds/dropdown/dropdown";
import { TDropdown } from "components/ds/dropdown/dropdown.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TBillingProfilesSelector } from "./billing-profiles-selector.types";

export function BillingProfilesSelector({ children, data, projectId, onSelect }: TBillingProfilesSelector.Props) {
  const [openBillingCreate] = useStackBillingCreate();
  const { mutate, ...rest } = MeApi.mutations.useUpdatePayoutPreferences({});
  const { T } = useIntl();

  useMutationAlert({
    mutation: rest,
    success: {
      message: T("v2.features.billingsProfile.selector.success"),
    },
    error: {
      default: true,
    },
  });

  function handleCreateBillingProfile() {
    openBillingCreate({ projectId });
  }
  async function onSelectBillingProfile(id: string) {
    if (projectId) {
      mutate({ billingProfileId: id, projectId });
    }

    onSelect?.(id);
  }

  const dynamicMenu: TDropdown.Item[] = useMemo(
    () =>
      (data || []).map(item => {
        return {
          key: item.id,
          children: item.name,
          startContent: <Icon {...item.icon} size={16} />,
          onClick: () => onSelectBillingProfile(item.id),
        };
      }),
    [data]
  );

  const menu: TDropdown.Item[] = useMemo(
    () => [
      ...dynamicMenu,
      {
        key: "add",
        children: <Translate token="v2.features.billingsProfile.selector.addNewBillingProfile" />,
        startContent: <Icon remixName="ri-add-line" size={16} />,
        onClick: handleCreateBillingProfile,
      },
    ],
    [dynamicMenu]
  );

  return <Dropdown items={menu}>{children}</Dropdown>;
}
