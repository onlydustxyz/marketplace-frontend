import { format } from "date-fns";
import { ReactNode, useMemo } from "react";

import { ProfileItemGrid } from "app/migration/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/migration/settings/billing/component/profile-item/profile-item";

import { Translate } from "components/layout/translate/translate";

import { TProfileCompany } from "./profile-company.types";

export function ProfileCompany({ profile }: TProfileCompany.Props) {
  const registrationDate = useMemo(() => {
    if (profile.registrationDate) {
      return format(new Date(profile.registrationDate), "MMM dd, yyyy");
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
