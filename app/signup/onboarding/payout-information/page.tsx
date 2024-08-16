"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BillingProfileReactQueryAdapter } from "core/application/react-query-adapter/billing-profile";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { BillingProfileTypeUnion } from "core/domain/billing-profile/models/billing-profile.types";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { BillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles";
import { TBillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles.types";

import { Paper } from "components/atoms/paper";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { Footer } from "../components/footer/footer";

export default function PayoutInformationPage() {
  const router = useRouter();

  const { data: user } = UserReactQueryAdapter.client.useGetMe({});

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
          toast.default(<Translate token="v2.pages.signup.payoutInformation.toast.success" />);
          reset();
          router.push(user?.hasCompletedOnboarding ? NEXT_ROUTER.home.all : NEXT_ROUTER.signup.onboarding.root);
        },
        onError: () => {
          toast.error(<Translate token="v2.pages.signup.payoutInformation.toast.error" />);
        },
      },
    });

  async function handleCreateBillingProfile(data: TBillingProfiles.form) {
    await createBillingProfile({
      name: data.name,
      type: data.type as BillingProfileTypeUnion,
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleCreateBillingProfile)} className="h-full">
        <SignupTemplate
          header={<AccountAlreadyExist />}
          footer={
            <Footer
              backButtonProps={{
                isDisabled: isPendingCreateBillingProfile,
              }}
              nextButtonProps={{
                type: "submit",
                isLoading: isPendingCreateBillingProfile,
                isDisabled: isPendingCreateBillingProfile,
              }}
            />
          }
        >
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
