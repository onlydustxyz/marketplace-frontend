import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { TLeaveBillingProfile } from "app/settings/billing/[id]/general-information/features/leave-billing-profile/leave-billing-profile.types";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function LeaveBillingProfile({ actionType }: TLeaveBillingProfile.Props) {
  const { T } = useIntl();
  const router = useRouter();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
  }

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
      message: T("v2.pages.settings.billing.information.leaveBillingProfile.toaster.success"),
    },
    error: {
      message: T("v2.pages.settings.billing.information.leaveBillingProfile.toaster.error"),
    },
  });

  function onConfirm() {
    deleteBillingProfile();
  }

  return (
    <div className="mt-6 w-max">
      <Button variant="secondary" size="s" onClick={onOpenConfirmation}>
        <Icon remixName="ri-door-open-line" />
        <Translate token="v2.pages.settings.billing.information.leaveBillingProfile.button" />
      </Button>
      <ConfirmationModal
        open={openConfirmation}
        onClose={onCancel}
        title={<Translate token="v2.pages.settings.billing.information.leaveBillingProfile.title" />}
        content={<Translate token={"v2.pages.settings.billing.information.leaveBillingProfile.confirmDescription"} />}
        buttons={{
          confirm: {
            children: (
              <Translate
                token="v2.pages.settings.billing.information.leaveBillingProfile.confirmButton"
                params={{ actionType }}
              />
            ),
            onClick: onConfirm,
          },
          cancel: {
            children: <Translate token="v2.pages.settings.billing.information.leaveBillingProfile.cancelButton" />,
          },
        }}
      />
    </div>
  );
}
