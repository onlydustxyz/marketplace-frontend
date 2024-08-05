import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { TManageBillingProfile } from "app/(v1)/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile.types";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

const iconName: Record<string, RemixIconsName> = {
  delete: "ri-delete-bin-2-line",
  disable: "ri-forbid-2-line",
  enable: "ri-refresh-line",
};
export function ManageBillingProfile({ actionType }: TManageBillingProfile.Props) {
  const { T } = useIntl();
  const router = useRouter();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { mutate: deleteBillingProfile, ...restDeleteBillingProfile } =
    BillingProfilesApi.mutations.useDeleteBillingProfile({
      params: {
        billingProfileId,
      },
      options: {
        onSuccess: () => {
          router.push(NEXT_ROUTER.settings.profile);
        },
      },
    });

  useMutationAlert({
    mutation: restDeleteBillingProfile,
    success: {
      message: T(`v2.pages.settings.billing.information.manageBillingProfile.toaster.${actionType}.success`),
    },
    error: {
      message: T(`v2.pages.settings.billing.information.manageBillingProfile.toaster.${actionType}.error`),
    },
  });

  const { mutate: enableOrDisableBillingProfile, ...restEnableOrDisableBillingProfile } =
    BillingProfilesApi.mutations.useEnableOrDisableBillingProfile({
      params: {
        billingProfileId,
      },
    });

  useMutationAlert({
    mutation: restEnableOrDisableBillingProfile,
    success: {
      message: T(`v2.pages.settings.billing.information.manageBillingProfile.toaster.${actionType}.success`),
    },
    error: {
      message: T(`v2.pages.settings.billing.information.manageBillingProfile.toaster.${actionType}.error`),
    },
  });

  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
  }

  function onConfirm() {
    switch (actionType) {
      case "delete":
        deleteBillingProfile();
        break;
      case "disable":
        enableOrDisableBillingProfile({ enable: false });
        break;
      case "enable":
        enableOrDisableBillingProfile({ enable: true });
        break;
    }
  }

  return (
    <div className="mt-6 w-max">
      <Button variant="secondary" size="s" onClick={onOpenConfirmation}>
        <Icon remixName={iconName[actionType]} />
        <Translate
          token="v2.pages.settings.billing.information.manageBillingProfile.button"
          params={{
            actionType: T(`v2.pages.settings.billing.information.manageBillingProfile.actionType.${actionType}`),
          }}
        />
      </Button>
      <ConfirmationModal
        open={openConfirmation}
        onClose={onCancel}
        title={<Translate token="v2.pages.settings.billing.information.manageBillingProfile.title" />}
        content={
          <Translate token={`v2.pages.settings.billing.information.manageBillingProfile.confirmation.${actionType}`} />
        }
        buttons={{
          confirm: {
            children: (
              <Translate
                token="v2.pages.settings.billing.information.manageBillingProfile.confirm"
                params={{ actionType }}
              />
            ),
            onClick: onConfirm,
          },
          cancel: {
            children: <Translate token="v2.pages.settings.billing.information.manageBillingProfile.cancel" />,
          },
        }}
      />
    </div>
  );
}
