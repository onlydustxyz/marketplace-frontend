import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import { useMemo } from "react";

import { ProfileBoolean } from "app/(v1)/settings/billing/[id]/general-information/components/profile-boolean/profile-boolean";
import { ProfileItemGrid } from "app/(v1)/settings/billing/[id]/general-information/components/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/(v1)/settings/billing/[id]/general-information/components/profile-item/profile-item";
import { TProfileIndividual } from "app/(v1)/settings/billing/[id]/general-information/features/profile/profile-individual/profile-individual.types";

import { Translate } from "components/layout/translate/translate";

export function ProfileIndividual({ profile }: TProfileIndividual.Props) {
  const birthdate = useMemo(() => {
    if (profile?.birthdate) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a hack to handle the date provided by SUMSUB
      return formatInTimeZone(new Date(profile.birthdate), "Europe/Paris", "MMM dd, yyyy", { locale: enGB });
    }
    return profile?.birthdate;
  }, [profile]);

  const validUntil = useMemo(() => {
    if (profile?.validUntil) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a temporary solution to handle the date provided by SUMSUB
      return formatInTimeZone(new Date(profile.validUntil), "Europe/Paris", "MMM dd, yyyy", { locale: enGB });
    }
    return profile?.validUntil;
  }, [profile]);

  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.firstName">{profile?.firstName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.lastName">{profile?.lastName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.birthdate">{birthdate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.address">{profile?.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.country">{profile?.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.usCitizen">
        <ProfileBoolean value={profile?.usCitizen} />
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.identityDocumentType">
        {profile?.idDocumentType ? (
          <>
            <Translate token={`v2.commons.enums.me.idDocumentType.${profile.idDocumentType}`} />
            {profile.idDocumentCountryCode ? (
              <span className="uppercase">&nbsp;({profile.idDocumentCountryCode})</span>
            ) : null}
          </>
        ) : null}
      </ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.information.kyc.validUntil">{validUntil}</ProfileItem>
    </ProfileItemGrid>
  );
}
