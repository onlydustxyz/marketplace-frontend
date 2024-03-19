"use client";

import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { Card } from "components/ds/card/card";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { BillingHeader } from "./components/billing-header/billing-header";
import { Tabs } from "./components/tabs/tabs";
import { ProfileInvitationBanner } from "./general-information/component/profile-invitation-banner/profile-invitation-banner";

function BillingLayout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id });

  const isInvited = profile?.data.me?.invitation;
  const hasRole = profile?.data.me?.role;
  const isAdmin = profile?.data.me?.role === BillingProfilesTypes.ROLE.ADMIN;

  return (
    <div className="flex flex-col gap-6">
      <BillingHeader />

      <Card className="relative flex w-full flex-col gap-6" background="base">
        {isAdmin ? <Tabs id={id} /> : null}

        <div>{children}</div>

        {isInvited && !hasRole ? <ProfileInvitationBanner profile={profile.data} /> : null}
      </Card>
    </div>
  );
}

export default BillingLayout;
