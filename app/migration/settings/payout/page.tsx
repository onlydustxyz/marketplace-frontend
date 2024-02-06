"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";

import { SettingsHeader } from "../components/settings-header/settings-header";
import { PayoutDisclaimer } from "./features/disclaimer/disclaimer";
import { FormFooter } from "./features/form/footer/footer";
import { PayoutForm } from "./features/form/form";
import { TPayoutForm } from "./features/form/form.types";

// TODO: Add zod
export default function PayoutPage() {
  const { T } = useIntl();

  // TODO: Change request and all form
  const { data } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: true },
  });

  const formMethods = useForm<TPayoutForm.Data>({
    mode: "onChange",
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }, [data]);

  const {
    mutate: updateUserProfileInfo,
    isPending: userProfilInformationIsPending,
    ...restUpdateProfileMutation
  } = MeApi.mutations.useUpdateProfile({
    options: {},
  });

  useMutationAlert({
    mutation: restUpdateProfileMutation,
    success: {
      message: T("v2.commons.alert.profile.success"),
    },
    error: {
      message: T("v2.commons.alert.profile.error"),
    },
  });

  const onSubmit = (formData: TPayoutForm.Data) => {
    updateUserProfileInfo(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form id="payout-form" className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="col" className="scrollbar-sm flex-1 gap-6 overflow-auto pb-4">
          <SettingsHeader title="v2.pages.settings.payout.title" subtitle="v2.pages.settings.payout.subtitle" />

          <Flex direction="col" className="gap-4">
            <PayoutForm />

            <PayoutDisclaimer />
          </Flex>
        </Flex>

        <FormFooter isPending={userProfilInformationIsPending} />
      </form>
    </FormProvider>
  );
}
