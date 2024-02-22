"use client";

import { useParams } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { BillingHeader } from "./components/billing-header/billing-header";

function BillingLayout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-6">
      <BillingHeader />

      <Card className="relative flex w-full flex-col" background="base">
        <div className="flex flex-row items-center justify-start gap-4">
          <Link href={NEXT_ROUTER.settings.migration.billing.generalInformation(id)}>
            <Translate token={"v2.pages.settings.billing.tabs.generalInformation"} />
          </Link>
          <Link href={NEXT_ROUTER.settings.migration.billing.paymentMethods(id)}>
            <Translate token={"v2.pages.settings.billing.tabs.paymentMethods"} />
          </Link>
          <Link href={NEXT_ROUTER.settings.migration.billing.coworkers(id)}>
            <Translate token={"v2.pages.settings.billing.tabs.coworkers"} />
          </Link>
          <Link href={NEXT_ROUTER.settings.migration.billing.invoices(id)}>
            <Translate token={"v2.pages.settings.billing.tabs.invoices"} />
          </Link>
        </div>
        <section>{children}</section>
      </Card>
    </div>
  );
}

export default BillingLayout;
