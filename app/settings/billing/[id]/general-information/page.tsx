"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LeaveBillingProfile } from "app/settings/billing/[id]/general-information/features/leave-billing-profile/leave-billing-profile";
import { ManageBillingProfile } from "app/settings/billing/[id]/general-information/features/manage-billing-profile/manage-billing-profile";
import { ProfileCompany } from "app/settings/billing/[id]/general-information/features/profile/profile-company/profile-company";
import { ProfileIndividual } from "app/settings/billing/[id]/general-information/features/profile/profile-individual/profile-individual";

import { StackRoute } from "src/App/Stacks/Stacks";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { useSubscribeStacks } from "src/libs/react-stack";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { AdminContentWrapper } from "../components/admin-content-wrapper/admin-content-wrapper";
import { ProfileBanner } from "./components/profile-banner/profile-banner";
import { ProfileStatus } from "./components/profile-status/profile-status";

function SettingsBillingPage() {
  const { id: billingProfileId } = useParams<{ id: string }>();
  const { profile, refetch } = useBillingProfileById({ id: billingProfileId, enabledPooling: false });
  const { open } = useSubscribeStacks(StackRoute.Verify);
  const [isPanelHasOpenedState, setIsPanelHasOpenedState] = useState(false);

  const validBillingProfile = profile?.status === "VERIFIED";
  const isBillingProfileIndividual = profile?.data?.type === BillingProfilesTypes.type.Individual;

  useEffect(() => {
    if (open && !isPanelHasOpenedState) {
      setIsPanelHasOpenedState(true);
    } else if (!open && isPanelHasOpenedState) {
      refetch();
      setIsPanelHasOpenedState(false);
    }
  }, [open, isPanelHasOpenedState]);

  const actionType = useMemo(() => {
    if (!profile?.data.enabled) {
      return "enable";
    } else if (profile?.data?.me.canDelete) {
      return "delete";
    } else {
      return "disable";
    }
  }, [profile]);

  const renderValue = useMemo(() => {
    if (isBillingProfileIndividual) {
      return <ProfileIndividual profile={profile?.data?.kyc} />;
    } else {
      return <ProfileCompany profile={profile?.data?.kyb} />;
    }
  }, [isBillingProfileIndividual, profile]);

  if (!profile) {
    return null;
  }

  return (
    <>
      <Card border="light" background={false}>
        <div
          className={cn("mb-1 flex w-full flex-row justify-end", {
            "mb-4": !profile.data.kyc && !profile.data.kyb,
          })}
        >
          <ProfileStatus status={profile?.status} hasValidBillingProfile={true} />
        </div>
        <div className="flex w-full flex-col gap-9">
          {renderValue}

          <AdminContentWrapper role={profile?.data.me?.role}>
            <ProfileBanner
              hasValidBillingProfile={validBillingProfile}
              status={profile?.status}
              type={profile.data.type}
              id={profile.externalId}
            />
          </AdminContentWrapper>
        </div>
      </Card>
      <div className="flex flex-row items-center gap-4">
        {!isBillingProfileIndividual ? (
          <AdminContentWrapper role={profile?.data.me?.role}>
            <ManageBillingProfile actionType={actionType} />
          </AdminContentWrapper>
        ) : null}

        {profile?.data.me.canLeave ? <LeaveBillingProfile actionType="leave" /> : null}

        {!profile?.data?.enabled ? (
          <Typography as="div" variant="body-s" className="mt-6 text-spaceBlue-200">
            <Translate token="v2.pages.settings.billing.information.manageBillingProfile.disabledDescription" />
          </Typography>
        ) : null}
      </div>
    </>
  );
}

export default withClientOnly(withAuthenticationRequired(SettingsBillingPage));
