"use client";

import { useCurrentUser } from "hooks/users/useCurrentUser";

import { ProfileCard } from "app/migration/settings/billing/component/profile-card/profile-card";
import { ProfileCompany } from "app/migration/settings/billing/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/migration/settings/billing/features/profile/profile-individual/profile-individual";
import { VerifyButton } from "app/migration/settings/billing/features/verify-button/verify-button";

import MeApi from "src/api/me";
import { UseBillingProfileCompanyResponse, UseBillingProfileIndividualResponse } from "src/api/me/billing/queries";
import { MeTypes } from "src/api/me/types";

import { Banner } from "components/ds/banner/banner";

import { Header } from "./features/header/header";

const fakeIndividualProfile: UseBillingProfileIndividualResponse = {
  address: "value address",
  birthdate: "value birthdate",
  country: "value country",
  firstName: "value firstName",
  id: "value id",
  idDocumentNumber: "value idDocumentNumber",
  idDocumentType: "DRIVER_LICENSE",
  lastName: "value lastName",
  status: "VERIFIED",
  usCitizen: true,
  validUntil: "value validUntil",
};
const fakeCompanyProfile: UseBillingProfileCompanyResponse = {
  address: "value address",
  country: "value country",
  euVATNumber: "value euVATNumber",
  id: "value id",
  name: "value name",
  registrationDate: "value registrationDate",
  registrationNumber: "value registrationNumber",
  subjectToEuropeVAT: true,
  usEntity: true,
  status: "NOT_STARTED",
};
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
      <ProfileCard status={data?.status} hasValidBillingProfile={user?.hasValidBillingProfile || false}>
        {data && user?.billingProfileType === MeTypes.billingProfileType.Individual && (
          <ProfileIndividual profile={data} />
        )}
        {data && user?.billingProfileType === MeTypes.billingProfileType.Company && <ProfileCompany profile={data} />}
        {user?.billingProfileType && data?.id ? <VerifyButton type={user.billingProfileType} id={data.id} /> : null}
      </ProfileCard>
      <ProfileCard status={fakeCompanyProfile?.status} hasValidBillingProfile={true}>
        <ProfileCompany profile={fakeCompanyProfile} />
      </ProfileCard>
      <ProfileCard status={fakeIndividualProfile?.status} hasValidBillingProfile={false}>
        <ProfileIndividual profile={fakeIndividualProfile} />
      </ProfileCard>
    </div>
  );
}
