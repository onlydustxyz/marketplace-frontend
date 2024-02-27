import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import { ReactNode, useMemo } from "react";

import { ProfileItemGrid } from "app/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/settings/billing/component/profile-item/profile-item";
import { TProfileCompany } from "app/settings/billing/features/profile/profile-company/profile-company.types";

import { Translate } from "components/layout/translate/translate";

export function ProfileCompany({ profile }: TProfileCompany.Props) {
  const registrationDate = useMemo(() => {
    if (profile.registrationDate) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a temporary solution to handle the date provided by SUMSUB
      return formatInTimeZone(new Date(profile.registrationDate), "Europe/Paris", "MMM dd, yyyy", { locale: enGB });
    }

    return profile.registrationDate;
  }, [profile]);

  const isYesOrNO = (yes: ReactNode, no: ReactNode, value?: boolean) => {
    if (value === true) {
      return yes;
    }
    if (value === false) {
      return no;
    }

    return null;
  };

  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.company.companyName">{profile.name}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.registrationNumber">
        {profile.registrationNumber}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.registrationDate">{registrationDate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.usEntity">
        {isYesOrNO(
          <Translate token="v2.pages.settings.billing.format.boolean.yes" />,
          <Translate token="v2.pages.settings.billing.format.boolean.no" />,
          profile.usEntity
        )}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.company.subjectToVatInEurope">
        {isYesOrNO(
          <Translate token="v2.pages.settings.billing.format.boolean.yes" />,
          <Translate token="v2.pages.settings.billing.format.boolean.no" />,
          profile.subjectToEuropeVAT
        )}
      </ProfileItem>

      {profile.euVATNumber ? (
        <ProfileItem label="v2.pages.settings.billing.company.euVatNumber">{profile.euVATNumber}</ProfileItem>
      ) : null}
    </ProfileItemGrid>
  );
}
