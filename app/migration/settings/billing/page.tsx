"use client";

import { useBillingProfiles } from "hooks/users/useBillingProfile/useBillingProfile";

import { ProfileBanner } from "app/migration/settings/billing/component/profile-banner/profile-banner";
import { ProfileCard } from "app/migration/settings/billing/component/profile-card/profile-card";
import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";

import { useStackRequestPayments } from "src/App/Stacks/Stacks";

import { Button } from "components/ds/button/button";

import { Header } from "./features/header/header";

export default function BillingPage() {
  const { billingProfile, profileType, isCompany, isIndividual, validBillingProfile } = useBillingProfiles();
  const [open] = useStackRequestPayments();
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
      <Button onClick={open}>Open request payment</Button>
    </div>
  );
}
