"use client";

import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useMemo } from "react";

import { ProfileBanner } from "app/migration/settings/billing/component/profile-banner/profile-banner";
import { ProfileCard } from "app/migration/settings/billing/component/profile-card/profile-card";
import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";

import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";

import { Header } from "./features/header/header";

export default function ProfilePage() {
  const { user } = useCurrentUser();
  const { data } = MeApi.billing.queries.useBillingProfile({
    params: { profile: user?.billingProfileType },
  });

  const profileType = useMemo(() => {
    if (user?.billingProfileType) {
      return user?.billingProfileType as MeTypes.billingProfileType;
    }
    return MeTypes.billingProfileType.Individual;
  }, [user]);

  const isIndividual = useMemo(() => profileType === MeTypes.billingProfileType.Individual, [profileType]);
  const isCompany = useMemo(() => profileType === MeTypes.billingProfileType.Company, [profileType]);

  return (
    <div className="flex flex-col gap-6">
      <Header
        initialData={{
          profile: profileType,
        }}
      />
      <ProfileCard status={data?.status} hasValidBillingProfile={user?.hasValidBillingProfile || false}>
        {data && isIndividual && <ProfileIndividual profile={data} />}
        {data && isCompany && <ProfileCompany profile={data} />}
        <ProfileBanner
          hasValidBillingProfile={user?.hasValidBillingProfile || false}
          status={data?.status}
          type={profileType}
          id={data?.id}
        />
      </ProfileCard>
    </div>
  );
}
