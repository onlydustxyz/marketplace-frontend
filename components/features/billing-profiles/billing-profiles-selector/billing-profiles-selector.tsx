import { useMemo } from "react";

import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";

import { Dropdown } from "components/ds/dropdown/dropdown";
import { TDropdown } from "components/ds/dropdown/dropdown.types";
import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { TBillingProfilesSelector } from "./billing-profiles-selector.types";

export function BillingProfilesSelector({ children, data, projectId, onSelect }: TBillingProfilesSelector.Props) {
  const [openBillingCreate] = useStackBillingCreate();
  const { mutate, isPending, ...rest } = MeApi.mutations.useUpdatePayoutPreferences({});
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

  function onSelectBillingProfile(id: string) {
    if (projectId) {
      mutate({ billingProfileId: id, projectId });
    }

    onSelect?.(id);
  }

  const dynamicMenu: TDropdown.Item[] = useMemo(
    () =>
      (data || []).map(item => {
        const color = () => {
          if (item?.hasError) {
            return "red";
          }
          if (item?.hasWarning) {
            return "orange";
          }
          return "white";
        };
        console.log(color());
        return {
          key: item.id,
          children: item.name,
          startContent: <Icon {...item.icon} color={color()} size={16} />,
          endContent: item.hasPendingInvitation ? (
            <Tag borderColor="multi-color" className="bg-greyscale-900 bg-noise-medium">
              <Translate token="v2.pages.settings.billing.sidebar.items.billing.new" />
            </Tag>
          ) : null,
          onClick: () => onSelectBillingProfile(item.id),
          isDisabled: !item.enabled || item.hasPendingInvitation,
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

  return <Dropdown items={menu}>{isPending ? <Spinner /> : children}</Dropdown>;
}
