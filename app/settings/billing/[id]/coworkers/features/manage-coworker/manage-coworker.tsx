import { useState } from "react";

import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TManageCoworker } from "./manage-coworker.types";

export function ManageCoworker({ onConfirm, actionType }: TManageCoworker.Props) {
  const { T } = useIntl();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const confirmationContent = () => {
    if (actionType === "disable") {
      return "disableDescription";
    } else if (actionType === "delete") {
      return "deleteDescription";
    } else if (actionType === "cancel") {
      return "cancelDescription";
    } else {
      return "enableDescription";
    }
  };
  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
  }

  return (
    <>
      <Button variant="secondary" size="s" onClick={onOpenConfirmation}>
        <Icon remixName="ri-delete-bin-2-line" />
        <Translate
          token="v2.pages.settings.billing.coworkers.manageCoworker.button"
          params={{
            actionType: T(`v2.pages.settings.billing.coworkers.manageCoworker.actionType.${actionType}`),
          }}
        />
      </Button>
      <ConfirmationModal
        open={openConfirmation}
        onClose={onCancel}
        title={<Translate token="v2.pages.settings.billing.coworkers.manageCoworker.title" />}
        content={<Translate token={`v2.pages.settings.billing.coworkers.manageCoworker.${confirmationContent()}`} />}
        buttons={{
          confirm: {
            children: (
              <Translate token="v2.pages.settings.billing.coworkers.manageCoworker.confirm" params={{ actionType }} />
            ),
            onClick: onConfirm,
          },
          cancel: {
            children: <Translate token="v2.pages.settings.billing.coworkers.manageCoworker.cancel" />,
          },
        }}
      />
    </>
  );
}
