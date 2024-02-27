import { format } from "date-fns";
import { ReactNode, useMemo } from "react";

import { ProfileItemGrid } from "app/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/settings/billing/component/profile-item/profile-item";
import { TProfileIndividual } from "app/settings/billing/features/profile/profile-individual/profile-individual.types";

import { Translate } from "components/layout/translate/translate";

export function ProfileIndividual({ profile }: TProfileIndividual.Props) {
  const birthdate = useMemo(() => {
    if (profile.birthdate) {
      return format(new Date(profile.birthdate), "MMM dd, yyyy");
    }
    return profile.birthdate;
  }, [profile]);

  const validUntil = useMemo(() => {
    if (profile.validUntil) {
      return format(new Date(profile.validUntil), "MMM dd, yyyy");
    }
    return profile.validUntil;
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
      <ProfileItem label="v2.pages.settings.billing.individual.firstName">{profile.firstName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.lastName">{profile.lastName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.birthdate">{birthdate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.usCitizen">
        {isYesOrNO(
          <Translate token="v2.pages.settings.billing.format.boolean.yes" />,
          <Translate token="v2.pages.settings.billing.format.boolean.no" />,
          profile.usCitizen
        )}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.identityDocumentType">
        {profile.idDocumentType ? (
          <>
            <Translate token={`v2.commons.enums.me.idDocumentType.${profile.idDocumentType}`} />
            {profile.idDocumentCountryCode ? (
              <span className="uppercase">&nbsp;({profile.idDocumentCountryCode})</span>
            ) : null}
          </>
        ) : null}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.validUntil">{validUntil}</ProfileItem>
    </ProfileItemGrid>
  );
}
