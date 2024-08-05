import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { Tabs as TabsComponent } from "components/ds/tabs/tabs";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TTabs } from "./tabs.types";

export function Tabs({ id, type }: TTabs.Props) {
  return (
    <TabsComponent
      isHref={true}
      tabs={[
        {
          content: <Translate token="v2.pages.settings.billing.tabs.generalInformation" />,
          key: NEXT_ROUTER.settings.billing.generalInformation(id),
          icon: { remixName: "ri-file-list-line" },
        },
        {
          content: <Translate token="v2.pages.settings.billing.tabs.paymentMethods" />,
          key: NEXT_ROUTER.settings.billing.paymentMethods(id),
          icon: { remixName: "ri-money-dollar-circle-line" },
        },
        ...(type === BillingProfilesTypes.type.Company
          ? [
              {
                content: <Translate token="v2.pages.settings.billing.tabs.coworkers" />,
                key: NEXT_ROUTER.settings.billing.coworkers(id),
                icon: { remixName: "ri-team-line" as RemixIconsName },
              },
            ]
          : []),
        {
          content: <Translate token="v2.pages.settings.billing.tabs.invoices" />,
          key: NEXT_ROUTER.settings.billing.invoices(id),
          icon: { remixName: "ri-money-dollar-box-line" },
        },
      ]}
    />
  );
}
