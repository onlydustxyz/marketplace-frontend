"use client";

import { useCurrentUser } from "hooks/users/useCurrentUser";

import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";
import { VerifyButton } from "app/migration/settings/billing/features/verify-button/verify-button";

import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";

import { Card } from "components/ds/card/card";

import { Header } from "./features/header/header";

export default function ProfilePage() {
  const { user } = useCurrentUser();
  const { data } = MeApi.billing.queries.useBillingProfile({
    params: { profile: user?.billingProfileType },
  });

  console.log("data", data);
  return (
    <div className="flex flex-col gap-6">
      <Header
        initialData={{
          profile: (user?.billingProfileType as MeTypes.billingProfileType) || MeTypes.billingProfileType.Individual,
        }}
      />
      <Card className="w-full" background="base">
        {data && user?.billingProfileType === MeTypes.billingProfileType.Individual && (
          <ProfileIndividual profile={data} />
        )}
        {data && user?.billingProfileType === MeTypes.billingProfileType.Company && <ProfileCompany profile={data} />}
        {user?.billingProfileType && data?.id ? <VerifyButton type={user.billingProfileType} id={data.id} /> : null}
      </Card>
    </div>
  );
}
