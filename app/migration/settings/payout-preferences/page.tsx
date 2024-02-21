import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

import { Banner } from "components/ds/banner/banner";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";

export default function PayoutPreferencesPage() {
  return (
    <>
      <SettingsHeader
        title="v2.pages.settings.payoutPreferences.title"
        subtitle="v2.pages.settings.payoutPreferences.subtitle"
      />

      <Card background="base">Table</Card>

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
