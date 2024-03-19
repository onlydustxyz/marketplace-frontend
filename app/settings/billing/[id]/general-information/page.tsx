"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ManageBillingProfile } from "app/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile";
import { ProfileCompany } from "app/settings/billing/[id]/general-information/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/settings/billing/[id]/general-information/features/profile/profile-individual/profile-individual";

import { StackRoute } from "src/App/Stacks/Stacks";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { useSubscribeStacks } from "src/libs/react-stack";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { ProfileBanner } from "./component/profile-banner/profile-banner";
import { ProfileStatus } from "./component/profile-status/profile-status";

function SettingsBillingPage() {
  const { id } = useParams<{ id: string }>();
  const { profile, refetch } = useBillingProfileById({ id });
  const { open } = useSubscribeStacks(StackRoute.Verify);
  const [isPanelHasOpenedState, setIsPanelHasOpenedState] = useState(false);
  const validBillingProfile = profile?.status === "VERIFIED";

  const isAdmin = profile?.data.me?.role === BillingProfilesTypes.ROLE.ADMIN;

  useEffect(() => {
    if (open && !isPanelHasOpenedState) {
      setIsPanelHasOpenedState(true);
    } else if (!open && isPanelHasOpenedState) {
      refetch();
      setIsPanelHasOpenedState(false);
    }
  }, [open, isPanelHasOpenedState]);

  if (!profile) {
    return null;
  }

  function onConfirm() {
    // TODO : waiting for backend
  }

  return (
    <>
      <Card border="light" background={false}>
        <div
          className={cn("mb-1 flex w-full flex-row justify-end", {
            "mb-4": !profile.data.kyc && !profile.data.kyb,
          })}
        >
          <ProfileStatus status={profile?.status} hasValidBillingProfile={true} />
        </div>
        <div className="flex w-full flex-col gap-9">
          {profile.data.kyc ? <ProfileIndividual profile={profile.data.kyc} /> : null}
          {profile.data.kyb ? <ProfileCompany profile={profile.data.kyb} /> : null}

          {isAdmin ? (
            <ProfileBanner
              hasValidBillingProfile={validBillingProfile}
              status={profile?.status}
              type={profile.data.type}
              id={profile.externalId}
            />
          ) : null}
        </div>
      </Card>
      {/*TODO put the appropriate actionType depending on canDelete and disable field*/}
      <ManageBillingProfile onConfirm={onConfirm} actionType="disable" />
    </>
  );
}

export default withAuthenticationRequired(SettingsBillingPage);
