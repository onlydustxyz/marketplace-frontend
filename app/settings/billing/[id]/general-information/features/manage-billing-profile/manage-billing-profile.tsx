import { redirect, useParams } from "next/navigation";
import { useState } from "react";

import { TManageBillingProfile } from "app/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile.types";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function ManageBillingProfile({ actionType }: TManageBillingProfile.Props) {
  const { T } = useIntl();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const confirmationContent = actionType === "disable" ? "disableDescription" : "deleteDescription";

  const { mutate: deleteBillingProfile, ...restDeleteBillingProfile } =
    BillingProfilesApi.mutations.useDeleteBillingProfile({
      params: {
        billingProfileId,
      },
      options: {
        onSuccess: () => {
          redirect(NEXT_ROUTER.settings.profile);
        },
      },
    });

  useMutationAlert({
    mutation: restDeleteBillingProfile,
    success: {
      message: T("v2.pages.settings.billing.information.manageBillingProfile.toaster.delete.success"),
    },
    error: {
      message: T("v2.pages.settings.billing.information.manageBillingProfile.toaster.delete.error"),
    },
  });
  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
  }

  function onConfirm() {
    // TODO waiting for rest mutations
    switch (actionType) {
      case "delete":
        deleteBillingProfile();
        break;
      case "disable":
        break;
      case "enable":
        break;
    }
  }

  return (
    <>
      <Button variant="secondary" size="s" onClick={onOpenConfirmation} className="mt-6">
        <Icon remixName="ri-delete-bin-2-line" />
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
          <Translate token={`v2.pages.settings.billing.information.manageBillingProfile.${confirmationContent}`} />
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
    </>
  );
}
