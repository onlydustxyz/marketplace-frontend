"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import {
  Channel,
  UserProfileInfo,
  fromFragment,
  mapFormDataToSchema,
} from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import isContactInfoProvided from "src/utils/isContactInfoProvided";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TApplyCallout } from "./apply-callout.types";

// TODO: Refacto isContactInfoProvided
// TODO: Refacto ContactInformations
export function ApplyCallout({
  icon,
  title,
  description,
  formDescription,
  buttonNotConnected,
  buttonConnected,
  profile,
  applyToProject,
  alreadyApplied,
}: TApplyCallout.Props) {
  const { T } = useIntl();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const contactInfoProvided = isContactInfoProvided(profile, [Channel.Telegram]);

  const [showContactInfos, setShowContactInfos] = useState(false);

  const formMethods = useForm<UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });

  const { handleSubmit, formState, getValues, reset } = formMethods;
  const { isDirty, isValid } = formState;

  useEffect(() => {
    const values = getValues();
    // If the form state is modified without this component remounting, this state will be unsynced from the "profile" value so we need to reset the state
    if (JSON.stringify(values) !== JSON.stringify(fromFragment(profile))) {
      reset(fromFragment(profile));
    }
  }, []);

  const {
    mutate: updateUserProfileInfo,
    isPending: userProfilInformationIsPending,
    ...restUpdateProfileMutation
  } = MeApi.mutations.useUpdateProfile({
    options: {
      onSuccess: () => {
        applyToProject();
        setShowContactInfos(false);
      },
    },
  });

  useMutationAlert({
    mutation: restUpdateProfileMutation,
    success: {
      message: T("v2.commons.alert.global.success"),
    },
    error: {
      message: T("v2.commons.alert.global.error"),
    },
  });

  const submitDisabled = !isDirty || !isValid || userProfilInformationIsPending;

  const onSubmit = (formData: UserProfileInfo) => {
    updateUserProfileInfo(mapFormDataToSchema(formData));
  };

  function handleLoginClick() {
    handleLoginWithRedirect(loginWithRedirect);
  }

  function handleApplyClick() {
    if (!contactInfoProvided) {
      setShowContactInfos(true);
    } else {
      applyToProject();
    }
  }

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-3 p-4">
        <Flex alignItems="center" className="gap-1">
          <Icon {...icon} className="text-spaceBlue-200" />

          <Typography variant="special-label" translate={{ token: title }} className="uppercase text-spaceBlue-200" />
        </Flex>

        {isAuthenticated ? (
          <>
            {showContactInfos ? (
              <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex direction="col" className="gap-4 rounded-xl border border-orange-500 p-4">
                    {formDescription ? (
                      <Typography
                        variant="body-s-bold"
                        className="text-orange-500"
                        translate={{ token: formDescription }}
                      />
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

                    <Button
                      disabled={submitDisabled}
                      size={isMd ? "m" : "s"}
                      width="full"
                      backgroundColor="blue"
                      type="submit"
                    >
                      <Icon remixName="ri-send-plane-2-line" size={20} />
                      <Translate token={buttonConnected} />
                    </Button>
                  </Flex>
                </form>
              </FormProvider>
            ) : (
              <Button
                onClick={handleApplyClick}
                disabled={alreadyApplied}
                size={isMd ? "m" : "s"}
                width="full"
                backgroundColor="blue"
              >
                <Icon remixName={alreadyApplied ? "ri-check-line" : "ri-send-plane-2-line"} size={20} />
                <Translate token={buttonConnected} />
              </Button>
            )}
          </>
        ) : (
          <Button onClick={handleLoginClick} size={isMd ? "m" : "s"} width="full">
            <Translate token={buttonNotConnected} />
          </Button>
        )}

        {description ? (
          <Typography variant="body-s" className="text-spaceBlue-200">
            <Translate token={description} />
          </Typography>
        ) : null}
      </Flex>
    </Card>
  );
}
