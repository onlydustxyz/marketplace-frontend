"use client";

import { useMemo } from "react";

import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";

import { Avatar } from "components/ds/avatar/avatar";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { BillingProfileTag } from "components/features/billing-profiles/billing-profile-tag/billing-profile-tag";
import { BillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector";
import { TBillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector.types";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

export function PayoutPreferencesTable() {
  const { T } = useIntl();
  const { data } = MeApi.queries.useGetPayoutPreferences({});
  const { profiles } = useBillingProfiles();

  const billingProfilesSelector: TBillingProfilesSelector.Data[] = useMemo(
    () =>
      profiles.map(profile => ({
        name: profile.data.name,
        icon: profile.icon,
        id: profile.data.id,
        enabled: profile.data.enabled && !profile.data.pendingInvitationResponse,
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
        const billing = row.billingProfile;
        const profile = billing
          ? {
              icon: BillingProfileConstant.profileTypeMapping[billing.type].icon,
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
