"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";

import { SettingsHeader } from "../components/settings-header/settings-header";
import { FormFooter } from "./features/form/footer/footer";
import { ProfileForm } from "./features/form/form";
import { TProfileForm } from "./features/form/form.types";
import { formatToData, formatToSchema } from "./features/form/form.utils";
import { ProfileGithubAccount } from "./features/github-account/github-account";

// TODO: Add zod
// TODO: Contact information and select input to do with NextUI
export default function ProfilePage() {
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
      message: T("v2.commons.alert.profile.success"),
    },
    error: {
      message: T("v2.commons.alert.profile.error"),
    },
  });

  const onSubmit = (formData: TProfileForm.Data) => {
    updateUserProfileInfo(formatToSchema(formData));
  };

  return (
    <FormProvider {...formMethods}>
      <form id="profile-form" className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="col" className="scrollbar-sm flex-1 gap-6 overflow-auto pb-4">
          <SettingsHeader
            title="v2.pages.settings.publicProfile.title"
            subtitle="v2.pages.settings.publicProfile.subtitle"
          />

          <Flex direction="col" className="gap-4">
            <ProfileGithubAccount />

            <ProfileForm />
          </Flex>
        </Flex>

        <FormFooter userProfilInformationIsPending={userProfilInformationIsPending} />
      </form>
    </FormProvider>
  );
}
