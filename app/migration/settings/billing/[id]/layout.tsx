"use client";

import { useParams } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { Card } from "components/ds/card/card";
import { Tabs } from "components/ds/tabs/tabs";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { BillingHeader } from "./components/billing-header/billing-header";

function BillingLayout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-6">
      <BillingHeader />

      <Card className="relative flex w-full flex-col gap-6" background="base">
        <Tabs
          isHref={true}
          tabs={[
            {
              content: <Translate token="v2.pages.settings.billing.tabs.generalInformation" />,
              key: NEXT_ROUTER.settings.migration.billing.generalInformation(id),
              icon: { remixName: "ri-file-list-line" },
            },
            {
              content: <Translate token="v2.pages.settings.billing.tabs.paymentMethods" />,
              key: NEXT_ROUTER.settings.migration.billing.paymentMethods(id),
              icon: { remixName: "ri-money-dollar-circle-line" },
            },
            {
              content: <Translate token="v2.pages.settings.billing.tabs.coworkers" />,
              key: NEXT_ROUTER.settings.migration.billing.coworkers(id),
              icon: { remixName: "ri-team-line" },
            },
            {
              content: <Translate token="v2.pages.settings.billing.tabs.invoices" />,
              key: NEXT_ROUTER.settings.migration.billing.invoices(id),
              icon: { remixName: "ri-money-dollar-box-line" },
            },
          ]}
        />
        <section>{children}</section>
      </Card>
    </div>
  );
}

export default BillingLayout;
