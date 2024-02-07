"use client";

import { ProfileBanner } from "app/migration/settings/billing/component/profile-banner/profile-banner";
import { ProfileCard } from "app/migration/settings/billing/component/profile-card/profile-card";
import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";
import { useBillingProfiles } from "app/migration/settings/hooks/useBillingProfile";

import { Header } from "./features/header/header";

export default function ProfilePage() {
  const { billingProfile, profileType, isCompany, isIndividual, validBillingProfile } = useBillingProfiles();
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
