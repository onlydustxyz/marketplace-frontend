"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { LimitReachedHeader } from "app/(v1)/settings/billing/[id]/components/limit-reached-header/limit-reached-header";
import { SettingsHeader } from "app/(v1)/settings/components/settings-header/settings-header";
import { PayoutPreferencesTable } from "app/(v1)/settings/payout-preferences/features/table/table";

import { Banner } from "components/ds/banner/banner";
import { Card } from "components/ds/card/card";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Translate } from "components/layout/translate/translate";

function PayoutPreferencesPage() {
  return (
    <>
      <LimitReachedHeader />
      <SettingsHeader
        tokenTitle="v2.pages.settings.payoutPreferences.title"
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

export default withClientOnly(withAuthenticationRequired(PayoutPreferencesPage));
