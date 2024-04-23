import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  Channel,
  UserProfileInfo,
  fromFragment,
  mapFormDataToSchema,
} from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import ContactInformations from "src/components/ContactInformations";
import { useIntl } from "src/hooks/useIntl";
import isContactInfoProvided from "src/utils/isContactInfoProvided";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TApplyCallout } from "./apply-callout.types";

// TODO: @NeoxAzrot change with the new one and delete this one
export function ApplyCallout({ profile, applyToProject, alreadyApplied }: TApplyCallout.Props) {
  const { T } = useIntl();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const contactInfoProvided = isContactInfoProvided(profile, [
    Channel.Telegram,
    Channel.Whatsapp,
    Channel.Twitter,
    Channel.Discord,
    Channel.LinkedIn,
  ]);

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
          <Icon remixName="ri-user-3-line" size={20} className="text-spaceBlue-200" />

          <Typography
            variant="special-label"
            translate={{ token: "v2.pages.project.overview.apply.title" }}
            className="uppercase text-spaceBlue-200"
          />
        </Flex>

        {isAuthenticated ? (
          <>
            {showContactInfos ? (
              <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex direction="col" className="gap-4 rounded-xl border border-orange-500 p-4">
                    <Typography
                      variant="body-s-bold"
                      className="text-orange-500"
                      translate={{ token: "v2.pages.project.overview.apply.contactNeeded" }}
                    />

                    <ContactInformations onlyEditable />

                    <Tooltip
                      content={<Translate token="v2.pages.project.overview.apply.tooltip.notYetApplied" />}
                      hasMaxWidth
                      isDisabled={submitDisabled}
                    >
                      <Button disabled={submitDisabled} width="full" type="submit">
                        {T("v2.pages.project.overview.apply.button.apply")}
                      </Button>
                    </Tooltip>
                  </Flex>
                </form>
              </FormProvider>
            ) : (
              <Tooltip
                content={
                  <Translate
                    token={
                      alreadyApplied
                        ? "v2.pages.project.overview.apply.tooltip.applied"
                        : "v2.pages.project.overview.apply.tooltip.notYetApplied"
                    }
                  />
                }
                hasMaxWidth={!alreadyApplied}
              >
                <Button onClick={handleApplyClick} disabled={alreadyApplied} width="full">
                  <Translate token="v2.pages.project.overview.apply.button.apply" />
                </Button>
              </Tooltip>
            )}
          </>
        ) : (
          <Button onClick={handleLoginClick} width="full">
            <Translate token="v2.pages.project.overview.apply.button.connectToApply" />
          </Button>
        )}

        <Typography variant="body-s" className="text-spaceBlue-200">
          <Translate
            token={
              alreadyApplied
                ? "v2.pages.project.overview.apply.informations.alreadyApply"
                : "v2.pages.project.overview.apply.informations.notYetApply"
            }
          />
        </Typography>
      </Flex>
    </Card>
  );
}
