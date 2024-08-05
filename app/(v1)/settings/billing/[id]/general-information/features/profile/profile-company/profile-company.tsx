import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import { useMemo } from "react";

import { ProfileBoolean } from "app/(v1)/settings/billing/[id]/general-information/components/profile-boolean/profile-boolean";
import { ProfileItemGrid } from "app/(v1)/settings/billing/[id]/general-information/components/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/(v1)/settings/billing/[id]/general-information/components/profile-item/profile-item";
import { TProfileCompany } from "app/(v1)/settings/billing/[id]/general-information/features/profile/profile-company/profile-company.types";

export function ProfileCompany({ profile }: TProfileCompany.Props) {
  const registrationDate = useMemo(() => {
    if (profile?.registrationDate) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a temporary solution to handle the date provided by SUMSUB
      return formatInTimeZone(new Date(profile.registrationDate), "Europe/Paris", "MMM dd, yyyy", { locale: enGB });
    }

    return profile?.registrationDate;
  }, [profile]);

  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.companyName">{profile?.name}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationNumber">
        {profile?.registrationNumber}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationDate">{registrationDate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.address">{profile?.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.country">{profile?.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.usEntity">
        <ProfileBoolean value={profile?.usEntity} />
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.subjectToVatInEurope">
        <ProfileBoolean value={profile?.subjectToEuropeVAT} />
      </ProfileItem>

      {profile?.euVATNumber ? (
        <ProfileItem label="v2.pages.settings.billing.information.kyb.euVatNumber">{profile.euVATNumber}</ProfileItem>
      ) : null}
    </ProfileItemGrid>
  );
}
