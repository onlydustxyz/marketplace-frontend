import { format } from "date-fns";
import { ReactNode, useMemo } from "react";

import { TProfileCompany } from "app/migration/settings/billing/[id]/general-information/features/profile/profile-company/profile-company.types";
import { ProfileItemGrid } from "app/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/settings/billing/component/profile-item/profile-item";

import { Translate } from "components/layout/translate/translate";

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
      <ProfileItem label="v2.pages.settings.billing.information.kyb.companyName">{profile.name}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationNumber">
        {profile.registrationNumber}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.registrationDate">{registrationDate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.usEntity">
        {isYesOrNO(
          <Translate token="v2.pages.settings.billing.format.boolean.yes" />,
          <Translate token="v2.pages.settings.billing.format.boolean.no" />,
          profile.usEntity
        )}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyb.subjectToVatInEurope">
        {isYesOrNO(
          <Translate token="v2.pages.settings.billing.information.format.boolean.yes" />,
          <Translate token="v2.pages.settings.billing.information.format.boolean.no" />,
          profile.subjectToEuropeVAT
        )}
      </ProfileItem>

      {profile.euVATNumber ? (
        <ProfileItem label="v2.pages.settings.billing.information.kyb.euVatNumber">{profile.euVATNumber}</ProfileItem>
      ) : null}
    </ProfileItemGrid>
  );
}
