"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";

import { FormContact } from "./contact/contact";
import { FormFooter } from "./footer/footer";
import { TProfileForm } from "./form.types";
import { formatToData, formatToSchema } from "./form.utils";
import { FormInformations } from "./informations/informations";
import { FormTechnologies } from "./technologies/technologies";
import { FormWeeklyAllocatedTime } from "./weekly-allocated-time/weekly-allocated-time";

// TODO: BottomBar fixed
// TODO: Parse on submit
export function ProfileForm() {
  const { T } = useIntl();

  const { data } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: true },
  });

  const formMethods = useForm<TProfileForm.Data>({
    mode: "onChange",
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (data) {
      reset({
        ...formatToData(data),
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
      message: T("profile.form.success"),
    },
    error: {
      message: T("profile.form.error"),
    },
  });

  const onSubmit = (formData: TProfileForm.Data) => {
    // updateUserProfileInfo(UProfileForm.mapFormDataToSchema(formData));
    console.log(formData);
    console.log("----");
    console.log(formatToSchema(formData));
  };

  return (
    <FormProvider {...formMethods}>
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="col" className="gap-4">
          <FormInformations />
          <FormContact />
          <FormTechnologies />
          <FormWeeklyAllocatedTime />
        </Flex>

        <FormFooter userProfilInformationIsPending={userProfilInformationIsPending} />
      </form>
    </FormProvider>
  );
}
