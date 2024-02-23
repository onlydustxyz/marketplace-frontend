"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";
import { PayoutPreferencesTable } from "app/migration/settings/payout-preferences/features/table/table";

import { Banner } from "components/ds/banner/banner";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";

function PayoutPreferencesPage() {
  return (
    <>
      <SettingsHeader
        title="v2.pages.settings.payoutPreferences.title"
        subtitle="v2.pages.settings.payoutPreferences.subtitle"
      />

      <Card background="base">
        <PayoutPreferencesTable />
      </Card>

      <Banner
        variant="base"
        title={<Translate token="v2.pages.settings.payoutPreferences.warning" />}
        icon={{ remixName: "ri-error-warning-line" }}
        size="s"
        hasBorder
      />
    </>
  );
}

export default withAuthenticationRequired(PayoutPreferencesPage);
