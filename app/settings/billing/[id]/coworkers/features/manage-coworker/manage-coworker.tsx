import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { TManageCoworker } from "./manage-coworker.types";

export function ManageCoworker({ actionType, githubUserId }: TManageCoworker.Props) {
  const { T } = useIntl();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { mutate: deleteCoworker, ...restDeleteCoworker } = BillingProfilesApi.mutations.useDeleteBillingCoworker({
    params: {
      billingProfileId,
      githubUserId: `${githubUserId}`,
    },
  });

  useMutationAlert({
    mutation: restDeleteCoworker,
    success: {
      message: T("v2.pages.settings.billing.coworkers.manageCoworker.mutationAlert.delete.success"),
    },
    error: {
      message: T("v2.pages.settings.billing.coworkers.manageCoworker.mutationAlert.delete.error"),
    },
  });

  const confirmationContent = useMemo(() => {
    if (actionType === "delete") {
      return "deleteDescription";
    }
    return "cancelDescription";
  }, [actionType]);

  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onConfirm() {
    deleteCoworker({});
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
        content={<Translate token={`v2.pages.settings.billing.coworkers.manageCoworker.${confirmationContent}`} />}
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
