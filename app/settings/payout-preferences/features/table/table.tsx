"use client";

import { useMemo } from "react";

import { TSidebarBilling } from "app/settings/components/sidebar/sidebar-billing/sidebar-billing.types";

import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import MeApi from "src/api/me";

import { Avatar } from "components/ds/avatar/avatar";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { BillingProfileTag } from "components/features/billing-profiles/billing-profile-tag/billing-profile-tag";
import { BillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector";
import { TBillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector.types";
import { TIcon } from "components/layout/icon/icon.types";
import { Translate } from "components/layout/translate/translate";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";
import { useIntl } from "hooks/translate/use-translate";

export function PayoutPreferencesTable() {
  const { T } = useIntl();
  const { data } = MeApi.queries.useGetPayoutPreferences({});
  const { profiles } = useBillingProfiles();

  function getIconRemixName(profile: TSidebarBilling.profile): TIcon.Props {
    const hasWarningState = profile?.data?.missingPayoutInfo || profile?.data?.missingVerification;
    const hasErrorState = profile?.data?.verificationBlocked || profile?.data?.individualLimitReached;
    if (!profile.data.enabled) {
      return { remixName: "ri-forbid-2-line" };
    }

    if (hasWarningState) {
      return { remixName: "ri-error-warning-line" };
    }

    if (hasErrorState) {
      return { remixName: "ri-error-warning-line" };
    }

    if (profile.data.role === "MEMBER") {
      return { remixName: "ri-team-line" };
    }

    return profile.icon;
  }

  const billingProfilesSelector: TBillingProfilesSelector.Data[] = useMemo(
    () =>
      profiles.map(profile => ({
        name: profile.data.name,
        icon: getIconRemixName(profile),
        id: profile.data.id,
        enabled: profile.data.enabled,
        hasPendingInvitation: profile.data.pendingInvitationResponse || false,
        hasError: (profile.data.verificationBlocked || profile.data.individualLimitReached) ?? false,
        hasWarning: (profile.data.missingVerification || profile.data.missingPayoutInfo) ?? false,
      })),
    [profiles]
  );

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "projects",
        children: <Translate token={"v2.pages.settings.payoutPreferences.table.projects"} />,
        icon: { remixName: "ri-folder-3-line" },
      },
      {
        key: "billing_profiles",
        children: <Translate token={"v2.pages.settings.payoutPreferences.table.billingProfiles"} />,
        icon: { remixName: "ri-money-dollar-circle-line" },
        align: "end",
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      (data || []).map(row => {
        const { billingProfile } = row;
        const hasWarningState = billingProfile?.missingPayoutInfo || billingProfile?.missingVerification;
        const hasErrorState = billingProfile?.verificationBlocked || billingProfile?.individualLimitReached;

        const project = row.project;
        const role = profiles.find(profile => profile.data.id === row.billingProfile?.id)?.data.role;

        const iconName = () => {
          if (hasErrorState) {
            return { remixName: "ri-error-warning-line" };
          }
          if (hasWarningState) {
            return { remixName: "ri-error-warning-line" };
          }
          if (role === "MEMBER") {
            return { remixName: "ri-team-line" };
          }
          if (billingProfile) {
            return BillingProfileConstant.profileTypeMapping[billingProfile?.type].icon;
          }
        };
        const profile = billingProfile
          ? {
              icon: iconName() as TIcon.Props,
              name: billingProfile.name,
              id: billingProfile.id,
              hasWarning: hasWarningState ?? false,
              hasError: hasErrorState ?? false,
            }
          : undefined;

        return {
          key: project.id,
          projects: (
            <Avatar.Labelled avatarProps={{ shape: "square", size: "s", src: project.logoUrl }}>
              {project.name}
            </Avatar.Labelled>
          ),
          billing_profiles: (
            <div className="flex justify-end">
              <BillingProfilesSelector data={billingProfilesSelector} projectId={project.id}>
                <BillingProfileTag profile={profile} />
              </BillingProfilesSelector>
            </div>
          ),
        };
      }),
    [data, billingProfilesSelector]
  );

  return <Table label={T("v2.pages.settings.payoutPreferences.title")} columns={columns} rows={rows} />;
}
