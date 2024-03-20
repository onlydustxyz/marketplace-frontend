import { useParams } from "next/navigation";

import { SettingsHeader } from "app/settings/components/settings-header/settings-header";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { MeTypes } from "src/api/me/types";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { AdminContentWrapper } from "../admin-content-wrapper/admin-content-wrapper";
import { IndividualProgression } from "./components/individual-progression/individual-progression";
import { InvitedBy } from "./components/invited-by/invited-by";
import { TeamworkMode } from "./components/teamwork-mode/teamwork-mode";

export function BillingHeader() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id, enabledPooling: false });

  const isAdmin = profile?.data?.me?.role === BillingProfilesTypes.ROLE.ADMIN;
  const isInvited = profile?.data.me?.invitation;
  const isIndividual = profile?.data?.type === MeTypes.billingProfileType.Individual;

  if (!profile) {
    return null;
  }

  const headerArgsBis = {
    [MeTypes.billingProfileType.Individual]: {
      icon: "ri-user-line" as RemixIconsName,
      title: profile.data?.name,
      subtitle: "v2.pages.settings.billing.header.individual.subtitle",
    },
    [MeTypes.billingProfileType.SelfEmployed]: {
      icon: "ri-suitcase-line" as RemixIconsName,
      title: profile.data?.name,
      subtitle: "v2.pages.settings.billing.header.selfEmployed.subtitle",
    },
    [MeTypes.billingProfileType.Company]: {
      icon: "ri-vip-crown-line" as RemixIconsName,
      title: profile.data?.name,
      subtitle: "v2.pages.settings.billing.header.company.subtitle",
    },
  };

  const props = headerArgsBis[profile.data?.type ?? MeTypes.billingProfileType.Individual];

  if (
    profile.data.me.role === BillingProfilesTypes.ROLE.MEMBER ||
    profile.data.me.invitation?.role === BillingProfilesTypes.ROLE.MEMBER
  ) {
    props.icon = "ri-team-line" as RemixIconsName;
    props.subtitle = "v2.pages.settings.billing.header.member.subtitle";
  }

  const renderChildren = () => {
    if (isInvited && !isAdmin) {
      return <InvitedBy invitation={profile.data.me.invitation} />;
    }

    if (isIndividual) {
      return (
        <IndividualProgression
          amount={profile.data.currentYearPaymentAmount}
          limit={profile.data.currentYearPaymentLimit}
        />
      );
    }

    return (
      <AdminContentWrapper role={profile.data.me.role}>
        <TeamworkMode
          type={profile.data.type}
          isSwitchableToSelfEmployed={profile.data.isSwitchableToSelfEmployed}
          id={id}
        />
      </AdminContentWrapper>
    );
  };

  return (
    <SettingsHeader {...headerArgsBis[profile.data?.type ?? MeTypes.billingProfileType.Individual]}>
      {renderChildren()}
    </SettingsHeader>
  );
}
