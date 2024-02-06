import { format } from "date-fns";
import { useMemo } from "react";

import { ProfileItemGrid } from "app/migration/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/migration/settings/billing/component/profile-item/profile-item";

import { TProfileCompany } from "./profile-company.types";

export function ProfileCompany({ profile }: TProfileCompany.Props) {
  const registrationDate = useMemo(() => {
    if (profile.registrationDate) {
      return format(new Date(profile.registrationDate), "MMM dd, yyyy");
    }

    return profile.registrationDate;
  }, [profile]);

  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.company.companyName">{profile.name}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.registrationNumber">
        {profile.registrationNumber}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.registrationDate">{registrationDate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.usEntity">{`${profile.usEntity}`}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.subjectToVatInEurope">
        {`${profile.subjectToEuropeVAT}`}
      </ProfileItem>

      {profile.euVATNumber ? (
        <ProfileItem label="v2.pages.settings.billing.company.euVatNumber">{profile.euVATNumber}</ProfileItem>
      ) : null}
    </ProfileItemGrid>
  );
}
