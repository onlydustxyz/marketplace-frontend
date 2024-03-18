"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ManageBillingProfile } from "app/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile";
import { ProfileCompany } from "app/settings/billing/[id]/general-information/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/settings/billing/[id]/general-information/features/profile/profile-individual/profile-individual";

import { StackRoute } from "src/App/Stacks/Stacks";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { useSubscribeStacks } from "src/libs/react-stack";

import { Card } from "components/ds/card/card";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { ProfileBanner } from "./component/profile-banner/profile-banner";
import { ProfileStatus } from "./component/profile-status/profile-status";

function SettingsBillingPage() {
  const { id } = useParams<{ id: string }>();
  const { profile, refetch } = useBillingProfileById({ id, enabledPooling: false });
  const { open } = useSubscribeStacks(StackRoute.Verify);
  const [isPanelHasOpenedState, setIsPanelHasOpenedState] = useState(false);
  const validBillingProfile = profile?.status === "VERIFIED";
  const isBillingProfileIndividual = profile?.data?.type === BillingProfilesTypes.type.Individual;

  useEffect(() => {
    if (open && !isPanelHasOpenedState) {
      setIsPanelHasOpenedState(true);
    } else if (!open && isPanelHasOpenedState) {
      refetch();
      setIsPanelHasOpenedState(false);
    }
  }, [open, isPanelHasOpenedState]);

  const renderValue = useMemo(() => {
    if (isBillingProfileIndividual) {
      return <ProfileIndividual profile={profile?.data?.kyc} />;
    } else {
      return <ProfileCompany profile={profile?.data?.kyb} />;
    }
  }, [isBillingProfileIndividual, profile]);

  if (!profile) {
    return null;
  }

  return (
    <>
      <Card border="light" background={false}>
        <div className="mb-5 flex w-full flex-row justify-end xl:-mb-1 ">
          <ProfileStatus status={profile?.status} hasValidBillingProfile={true} />
        </div>
        <div className="flex w-full flex-col gap-9">
          {renderValue}
          <ProfileBanner
            hasValidBillingProfile={validBillingProfile}
            status={profile?.status}
            type={profile.data.type}
            id={profile.externalId}
          />
        </div>
      </Card>
      {/*TODO put the appropriate actionType depending on canDelete and disable field*/}
      <ManageBillingProfile actionType="delete" />
    </>
  );
}

export default withAuthenticationRequired(SettingsBillingPage);
