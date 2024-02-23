import { format } from "date-fns";
import { useMemo } from "react";

import { ProfileBoolean } from "app/migration/settings/billing/[id]/general-information/component/profile-boolean/profile-boolean";
import { TProfileCompany } from "app/migration/settings/billing/[id]/general-information/features/profile/profile-company/profile-company.types";
import { ProfileItemGrid } from "app/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/settings/billing/component/profile-item/profile-item";

export function ProfileCompany({ profile }: TProfileCompany.Props) {
  const registrationDate = useMemo(() => {
    if (profile.registrationDate) {
      return format(new Date(profile.registrationDate), "MMM dd, yyyy");
    }

    return profile.registrationDate;
  }, [profile]);

  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.companyName">{profile.name}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationNumber">
        {profile.registrationNumber}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationDate">{registrationDate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.usEntity">
        <ProfileBoolean value={profile.usEntity} />
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.subjectToVatInEurope">
        <ProfileBoolean value={profile.subjectToEuropeVAT} />
      </ProfileItem>

      {profile.euVATNumber ? (
        <ProfileItem label="v2.pages.settings.billing.information.kyb.euVatNumber">{profile.euVATNumber}</ProfileItem>
      ) : null}
    </ProfileItemGrid>
  );
}
