"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TApplyForm } from "./form.types";
import { fromFragment, mapFormDataToSchema } from "./form.utils";

// TODO: @NeoxAzrot Refacto ContactInformations
export function ApplyForm({ formDescription, buttonConnected, onApply, profile, setShowForm }: TApplyForm.Props) {
  const { T } = useIntl();

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const formMethods = useForm<TApplyForm.UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });

  const { handleSubmit, formState, getValues, reset } = formMethods;
  const { isDirty, isValid } = formState;

  const {
    mutate: updateUserProfileInfo,
    isPending: userProfilInformationIsPending,
    ...restUpdateProfileMutation
  } = MeApi.mutations.useUpdateProfile({
    options: {
      onSuccess: () => {
        onApply();
        setShowForm(false);
      },
    },
  });

  const submitDisabled = !isDirty || !isValid || userProfilInformationIsPending;

  const onSubmit = (formData: TApplyForm.UserProfileInfo) => {
    updateUserProfileInfo(mapFormDataToSchema(formData));
  };

  useMutationAlert({
    mutation: restUpdateProfileMutation,
    success: {
      message: T("v2.commons.alert.global.success"),
    },
    error: {
      message: T("v2.commons.alert.global.error"),
    },
  });

  useEffect(() => {
    const values = getValues();
    // If the form state is modified without this component remounting, this state will be unsynced from the "profile" value so we need to reset the state
    if (JSON.stringify(values) !== JSON.stringify(fromFragment(profile))) {
      reset(fromFragment(profile));
    }
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="col" className="gap-4 rounded-xl border border-orange-500 p-4">
          {formDescription ? (
            <Typography variant="body-s-bold" className="text-orange-500" translate={{ token: formDescription }} />
          ) : null}

          <ContactInformation
            name="telegram"
            placeholder={T("profile.form.contactInfo.telegram")}
            icon={<Telegram size={16} className="fill-greyscale-400" />}
            visibilityName="isTelegramPublic"
            options={{
              pattern: {
                value: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
                message: T("profile.form.contactInfo.invalidUsername"),
              },
            }}
          />

          <Button disabled={submitDisabled} size={isMd ? "m" : "s"} width="full" backgroundColor="blue" type="submit">
            <Icon remixName="ri-send-plane-2-line" size={20} />
            <Translate token={buttonConnected} />
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
