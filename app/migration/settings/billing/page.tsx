"use client";

import { useEffect, useState } from "react";

import { ProfileBanner } from "app/migration/settings/billing/component/profile-banner/profile-banner";
import { ProfileCard } from "app/migration/settings/billing/component/profile-card/profile-card";
import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";

import { StackRoute } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import { usePooling } from "src/hooks/usePooling/usePooling";
import { useSubscribeStacks } from "src/libs/react-stack";

import { useBillingProfiles } from "hooks/users/useBillingProfile/useBillingProfile";

import { Header } from "./features/header/header";

export default function BillingPage() {
  const { billingProfile, profileType, isCompany, isIndividual, validBillingProfile } = useBillingProfiles();
  const { open } = useSubscribeStacks(StackRoute.Verify);
  const [isPanelHasOpenedState, setIsPanelHasOpenedState] = useState(false);

  const { refetchOnWindowFocus, refetchInterval, onRefetching, resetPooling } = usePooling({
    limites: 6,
    delays: 5000,
  });

  const { isRefetching, refetch } = MeApi.billing.queries.useBillingProfile({
    params: { profile: profileType },
    options: { refetchOnWindowFocus, refetchInterval },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  useEffect(() => {
    if (profileType) {
      resetPooling();
    }
  }, [profileType]);

  useEffect(() => {
    if (open && !isPanelHasOpenedState) {
      setIsPanelHasOpenedState(true);
    } else if (!open && isPanelHasOpenedState) {
      refetch();
      resetPooling();
      setIsPanelHasOpenedState(false);
    }
  }, [open, isPanelHasOpenedState]);

  return (
    <div className="flex flex-col gap-6">
      <Header
        initialData={{
          profile: profileType,
        }}
      />
      <ProfileCard status={billingProfile?.status} hasValidBillingProfile={validBillingProfile}>
        {billingProfile && isIndividual ? <ProfileIndividual profile={billingProfile} /> : null}
        {billingProfile && isCompany ? <ProfileCompany profile={billingProfile} /> : null}
        <ProfileBanner
          hasValidBillingProfile={validBillingProfile}
          status={billingProfile?.status}
          type={profileType}
          id={billingProfile?.id}
        />
      </ProfileCard>
    </div>
  );
}
