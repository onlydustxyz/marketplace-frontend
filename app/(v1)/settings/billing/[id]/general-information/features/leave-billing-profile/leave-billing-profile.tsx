import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { TLeaveBillingProfile } from "app/(v1)/settings/billing/[id]/general-information/features/leave-billing-profile/leave-billing-profile.types";

import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";

import { Button } from "components/ds/button/button";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function LeaveBillingProfile({ actionType }: TLeaveBillingProfile.Props) {
  const { T } = useIntl();
  const router = useRouter();
  const { id: billingProfileId } = useParams<{ id: string }>();
  const { githubUserId } = useCurrentUser();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onCancel() {
    setOpenConfirmation(false);
  }

  const { mutate: leaveBillingProfile, ...restLeaveBillingProfile } =
    BillingProfilesApi.mutations.useDeleteBillingCoworker({
      params: {
        billingProfileId,
        githubUserId: `${githubUserId}`,
      },
      options: {
        onSuccess: () => {
          router.push(NEXT_ROUTER.settings.profile);
        },
      },
    });

  useMutationAlert({
    mutation: restLeaveBillingProfile,
    success: {
      message: T("v2.pages.settings.billing.information.leaveBillingProfile.toaster.success"),
    },
    error: {
      message: T("v2.pages.settings.billing.information.leaveBillingProfile.toaster.error"),
    },
  });

  function onConfirm() {
    leaveBillingProfile({});
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
