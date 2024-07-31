"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BillingProfileReactQueryAdapter } from "core/application/react-query-adapter/billing-profile";
import { BillingProfileTypeUnion } from "core/domain/billing-profile/models/billing-profile.types";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { BillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles";
import { TBillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles.types";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

export default function PayoutInformationPage() {
  const formMethods = useForm<TBillingProfiles.form>({
    resolver: zodResolver(TBillingProfiles.validation),
    defaultValues: {
      name: "",
      type: "SELF_EMPLOYED",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const { mutateAsync: createBillingProfile, isPending: isPendingCreateBillingProfile } =
    BillingProfileReactQueryAdapter.client.useCreateBillingProfile({
      options: {
        onSuccess: () => {
          toast.default(<Translate token="v2.pages.signup.verificationInformation.toast.success" />);
          reset();
          // TODO @Mehdi add redirection to next step
        },
        onError: () => {
          toast.error(<Translate token="v2.pages.signup.verificationInformation.toast.error" />);
        },
      },
    });

  async function handleCreateBillingProfile(data: TBillingProfiles.form) {
    await createBillingProfile({
      name: data.name,
      type: data.type as BillingProfileTypeUnion,
    });
  }

  const renderFooter = useMemo(() => {
    return (
      <div className="flex justify-end gap-1">
        <Button
          variant="secondary-light"
          size="l"
          translate={{ token: "v2.pages.signup.payoutInformation.footer.back" }}
          startIcon={{ remixName: "ri-arrow-left-s-line" }}
          // TODO @Mehdi add back redirection to previous step
          isDisabled={isPendingCreateBillingProfile}
        />
        <Button
          type={"submit"}
          variant="primary"
          size="l"
          translate={{ token: "v2.pages.signup.payoutInformation.footer.next" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          isLoading={isPendingCreateBillingProfile}
          isDisabled={isPendingCreateBillingProfile}
        />
      </div>
    );
  }, [isPendingCreateBillingProfile]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleCreateBillingProfile)} className="h-full">
        <SignupTemplate header={<AccountAlreadyExist />} footer={renderFooter}>
          <Paper size={"l"} container={"2"} classNames={{ base: "flex flex-col gap-6 min-h-full" }}>
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
