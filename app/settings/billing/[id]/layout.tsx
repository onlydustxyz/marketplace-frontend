"use client";

import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

import { Card } from "components/ds/card/card";
import { Tabs } from "components/ds/tabs/tabs";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { BillingHeader } from "./components/billing-header/billing-header";
import { ProfileInvitationBanner } from "./general-information/component/profile-invitation-banner/profile-invitation-banner";

function BillingLayout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id });

  return (
    <div className="flex flex-col gap-6">
      <BillingHeader />

      <Card className="relative flex w-full flex-col gap-6" background="base">
        <Tabs
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
            {
              content: <Translate token="v2.pages.settings.billing.tabs.coworkers" />,
              key: NEXT_ROUTER.settings.billing.coworkers(id),
              icon: { remixName: "ri-team-line" },
            },
            {
              content: <Translate token="v2.pages.settings.billing.tabs.invoices" />,
              key: NEXT_ROUTER.settings.billing.invoices(id),
              icon: { remixName: "ri-money-dollar-box-line" },
            },
          ]}
        />

        <div>{children}</div>

        {profile?.data.me?.invitation ? <ProfileInvitationBanner profile={profile.data} /> : null}
      </Card>
    </div>
  );
}

export default BillingLayout;
