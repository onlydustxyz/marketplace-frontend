import { ProfileItemGrid } from "app/migration/settings/billing/component/profile-item-grid/profile-item-grid";
import { ProfileItem } from "app/migration/settings/billing/component/profile-item/profile-item";

import { TProfileIndividual } from "./profile-individual.types";

export function ProfileIndividual({ profile }: TProfileIndividual.Props) {
  return (
    <ProfileItemGrid>
      <ProfileItem label="v2.pages.settings.billing.individual.firstName">{profile.firstName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.lastName">{profile.lastName}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.birthdate">{profile.birthdate}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.address">{profile.address}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.country">{profile.country}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.usCitizen">{profile.usCitizen}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.idDocumentType">{profile.idDocumentType}</ProfileItem>
      <ProfileItem label="v2.pages.settings.billing.individual.validUntil">{profile.validUntil}</ProfileItem>
    </ProfileItemGrid>
  );
}
