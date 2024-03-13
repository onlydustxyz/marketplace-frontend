import { useState } from "react";

import { TManageBillingProfile } from "app/migration/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile.types";

import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

export function ManageBillingProfile({ onConfirm, actionType }: TManageBillingProfile.Props) {
  const { T } = useIntl();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const confirmationContent = actionType === "disable" ? "disableDescription" : "deleteDescription";
  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
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
