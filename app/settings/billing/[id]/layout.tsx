"use client";

import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

import { Card } from "components/ds/card/card";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { AdminContentWrapper } from "./components/admin-content-wrapper/admin-content-wrapper";
import { BillingHeader } from "./components/billing-header/billing-header";
import { Tabs } from "./components/tabs/tabs";
import { ProfileInvitationBanner } from "./general-information/component/profile-invitation-banner/profile-invitation-banner";

function BillingLayout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id });

  const isInvited = profile?.data.me?.invitation;
  const hasRole = profile?.data.me?.role;

  return (
    <div className="flex flex-col gap-6">
      <BillingHeader />

      <Card className="relative flex w-full flex-col gap-6" background="base">
        <AdminContentWrapper role={profile?.data.me?.role}>
          <Tabs id={id} type={profile?.data.type} />
        </AdminContentWrapper>

        <div>{children}</div>

        {isInvited && !hasRole ? <ProfileInvitationBanner profile={profile.data} /> : null}
      </Card>
    </div>
  );
}

export default BillingLayout;
