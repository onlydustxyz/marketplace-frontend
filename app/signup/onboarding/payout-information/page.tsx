"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BillingProfileTypeUnion } from "core/domain/billing-profile/billing-profile-contract.types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { BillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles";
import { TBillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles.types";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

export default function PayoutInformationPage() {
  const formMethods = useForm<TBillingProfiles.form>({
    resolver: zodResolver(TBillingProfiles.validation),
    defaultValues: {
      name: "",
      type: "INDIVIDUAL" as BillingProfileTypeUnion,
    },
  });

  const { handleSubmit, watch } = formMethods;

  function handleCreateBillingProfile(data: TBillingProfiles.form) {}

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleCreateBillingProfile)} className="h-full">
        <SignupTemplate header={<AccountAlreadyExist showDisconnectButton />}>
          <Paper size={"l"} container={"3"} classNames={{ base: "flex flex-col gap-6 min-h-full" }}>
            <StepHeader
              step={2}
              stepPath={"/signup/onboarding"}
              subStep={{ token: "v2.pages.signup.payoutInformation.stepTitle" }}
            />
            <Title
              title={{ token: "v2.pages.signup.payoutInformation.title" }}
              content={{ token: "v2.pages.signup.payoutInformation.subtitle" }}
            />
            <BillingProfiles />
            <Paper size={"s"} container={"3"} classNames={{ base: "flex flex-col gap-2" }}>
              <Typo
                size={"xs"}
                weight={"medium"}
                color={"text-1"}
                translate={{ token: "v2.pages.signup.payoutInformation.specialMention.title" }}
              />
              <Typo
                size={"xs"}
                weight={"medium"}
                color={"text-2"}
                translate={{ token: "v2.pages.signup.payoutInformation.specialMention.description" }}
              />
            </Paper>
          </Paper>
        </SignupTemplate>
      </form>
    </FormProvider>
  );
}
