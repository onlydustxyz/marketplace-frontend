"use client";

import { useMemo } from "react";

import { useIntl } from "src/hooks/useIntl";

import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";

export function PayoutPreferencesTable() {
  const { T } = useIntl();

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
    () => [
      {
        key: "0",
        projects: "Project",
        billing_profiles: "Billing profile",
      },
    ],
    []
  );

  return <Table columns={columns} rows={rows} />;
}
