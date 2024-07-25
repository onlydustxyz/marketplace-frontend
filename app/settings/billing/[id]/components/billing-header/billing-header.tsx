import { BillingProfileShort } from "core/domain/billing-profile/models/billing-profile-short-model";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { SettingsHeader } from "app/settings/components/settings-header/settings-header";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { MeTypes } from "src/api/me/types";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { AdminContentWrapper } from "../admin-content-wrapper/admin-content-wrapper";
import { TBillingHeader } from "./billing-header.types";
import { IndividualProgression } from "./components/individual-progression/individual-progression";
import { InvitedBy } from "./components/invited-by/invited-by";
import { TeamworkMode } from "./components/teamwork-mode/teamwork-mode";

export function BillingHeader() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id, enabledPooling: false });

  const role = profile?.data.me.role;

  const shortBillingProfile = profile?.data ? new BillingProfileShort(profile.data) : null;
  const isAdmin = role === BillingProfilesTypes.ROLE.ADMIN;
  const isInvited = profile?.data.me?.invitation;
  const isIndividual = profile?.data?.type === MeTypes.billingProfileType.Individual;

  const headerArgs: TBillingHeader.HeaderArgs = {
    [MeTypes.billingProfileType.Individual]: {
      icon: "ri-user-line",
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.individual.subtitle",
    },
    [MeTypes.billingProfileType.SelfEmployed]: {
      icon: "ri-suitcase-line",
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.selfEmployed.subtitle",
    },
    [MeTypes.billingProfileType.Company]: {
      icon: "ri-vip-crown-line",
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.company.subtitle",
    },
    MEMBER: {
      icon: "ri-team-line",
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.member.subtitle",
    },
  };

  const getHeaderArg = useMemo(() => {
    if (
      role === BillingProfilesTypes.ROLE.MEMBER ||
      profile?.data.me.invitation?.role === BillingProfilesTypes.ROLE.MEMBER
    ) {
      return BillingProfilesTypes.ROLE.MEMBER;
    }

    return profile?.data?.type ?? MeTypes.billingProfileType.Individual;
  }, [role, profile]);

  const renderValue = useMemo(() => {
    if (isInvited && !isAdmin) {
      return <InvitedBy invitation={profile?.data.me.invitation} />;
    }

    if (isIndividual) {
      return (
        <IndividualProgression
          amount={shortBillingProfile?.currentYearPaymentAmount}
          limit={shortBillingProfile?.currentYearPaymentLimit}
        />
      );
    }

    return (
      <AdminContentWrapper role={role}>
        <TeamworkMode
          type={profile?.data.type}
          isSwitchableToSelfEmployed={profile?.data.isSwitchableToSelfEmployed}
          id={id}
        />
      </AdminContentWrapper>
    );
  }, [isInvited, isAdmin, isIndividual, profile, role, id, shortBillingProfile]);

  if (!profile) {
    return null;
  }

  return (
    <SettingsHeader {...headerArgs[getHeaderArg]} individualLimit={shortBillingProfile?.getLimitAmount()}>
      {renderValue}
    </SettingsHeader>
  );
}
