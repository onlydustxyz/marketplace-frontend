"use client";

import { useMemo } from "react";

import { TSidebarBilling } from "app/settings/components/sidebar/sidebar-billing/sidebar-billing.types";

import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";

import { Avatar } from "components/ds/avatar/avatar";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { BillingProfileTag } from "components/features/billing-profiles/billing-profile-tag/billing-profile-tag";
import { BillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector";
import { TBillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector.types";
import { TIcon } from "components/layout/icon/icon.types";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

export function PayoutPreferencesTable() {
  const { T } = useIntl();
  const { data } = MeApi.queries.useGetPayoutPreferences({});
  const { profiles } = useBillingProfiles();

  function getIconRemixName(profile: TSidebarBilling.profile): TIcon.Props {
    if (!profile.data.enabled) {
      return { remixName: "ri-forbid-2-line" };
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
      })),
    [profiles]
  );

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "projects",
        label: T("v2.pages.settings.payoutPreferences.table.projects"),
        icon: { remixName: "ri-folder-3-line" },
      },
      {
        key: "billing_profiles",
        label: T("v2.pages.settings.payoutPreferences.table.billingProfiles"),
        icon: { remixName: "ri-money-dollar-circle-line" },
        align: "end",
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      (data || []).map(row => {
        const project = row.project;
        const role = profiles.find(profile => profile.data.id === row.billingProfile?.id)?.data.role;
        const billing = row.billingProfile;
        const profile = billing
          ? {
              icon:
                role === "MEMBER"
                  ? { remixName: "ri-team-line" as RemixIconsName }
                  : BillingProfileConstant.profileTypeMapping[billing.type].icon,
              name: billing.name,
              id: billing.id,
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

  return <Table columns={columns} rows={rows} />;
}
