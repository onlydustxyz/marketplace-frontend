"use client";

import { useMemo } from "react";

import MeApi from "src/api/me";

import { Avatar } from "components/ds/avatar/avatar";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { BillingProfileTag } from "components/features/billing-profiles/billing-profile-tag/billing-profile-tag";
import { BillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector";
import { TBillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector.types";
import { Translate } from "components/layout/translate/translate";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";
import { useIntl } from "hooks/translate/use-translate";

export function PayoutPreferencesTable() {
  const { T } = useIntl();
  const { data } = MeApi.queries.useGetPayoutPreferences({});
  const { profiles } = useBillingProfiles();

  const billingProfilesSelector: TBillingProfilesSelector.Data[] = useMemo(
    () =>
      profiles.map(profile => ({
        name: profile.data.name,
        icon: profile?.overrides?.icon,
        iconColor: profile?.overrides?.iconColor,
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
        const project = row.project;
        const currentProfile = profiles.find(profile => profile.data.id === billingProfile?.id);

        const profile = currentProfile
          ? {
              icon: currentProfile?.overrides?.icon,
              iconColor: currentProfile?.overrides?.iconColor,
              tagColor: currentProfile?.overrides?.tagColor,
              name: currentProfile.data?.name,
              id: currentProfile.data?.id,
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
