import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import ContactInformations from "src/components/ContactInformations";
import { withTooltip } from "src/components/Tooltip";
import {
  Channel,
  UserProfileInfo,
  fromFragment,
  mapFormDataToSchema,
} from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { useIntl } from "src/hooks/useIntl";
import isContactInfoProvided from "src/utils/isContactInfoProvided";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import User3Line from "src/icons/User3Line";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login.ts";
import { useAuth0 } from "@auth0/auth0-react";

interface ApplyCalloutProps {
  isAuthenticated?: boolean;
  alreadyApplied?: boolean;
  applyToProject: () => void;
  profile: UseGetMyProfileInfoResponse;
}

export function ApplyCallout({ isAuthenticated, profile, alreadyApplied, applyToProject }: ApplyCalloutProps) {
  const { T } = useIntl();
  const { loginWithRedirect } = useAuth0();

  const contactInfoProvided = isContactInfoProvided(profile, [
    Channel.Telegram,
    Channel.Whatsapp,
    Channel.Twitter,
    Channel.Discord,
    Channel.LinkedIn,
  ]);

  const [contactInfoRequested, setContactInfoRequested] = useState(false);

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
      onSuccess: applyToProject,
    },
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

  const submitDisabled = !isDirty || !isValid || userProfilInformationIsPending;

  const onSubmit = (formData: UserProfileInfo) => {
    updateUserProfileInfo(mapFormDataToSchema(formData));
  };

  function handleLoginClick() {
    handleLoginWithRedirect(loginWithRedirect);
  }

  return (
    <Card className="p-4 lg:p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2 font-walsheim text-sm font-medium text-spaceBlue-200">
          <User3Line />
          {T("project.hiring").toUpperCase()}
        </div>
        {isAuthenticated ? (
          contactInfoRequested && !contactInfoProvided ? (
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 rounded-xl border border-orange-500 p-4">
                  <div className="font-walsheim text-sm font-medium text-orange-500">
                    {T("applications.contactNeeded")}
                  </div>
                  <ContactInformations onlyEditable />
                  <div {...withTooltip(submitDisabled ? "" : T("applications.notYetAppliedTooltip"))}>
                    <Button
                      data-testid="apply-btn"
                      size={ButtonSize.Md}
                      width={Width.Full}
                      disabled={submitDisabled}
                      htmlType="submit"
                      onBackground={ButtonOnBackground.Blue}
                    >
                      {T("applications.applyButton")}
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          ) : (
            <div
              {...withTooltip(T(alreadyApplied ? "applications.appliedTooltip" : "applications.notYetAppliedTooltip"))}
            >
              <Button
                data-testid="apply-btn"
                size={ButtonSize.Md}
                width={Width.Full}
                disabled={alreadyApplied}
                onBackground={ButtonOnBackground.Blue}
                onClick={() => {
                  if (!contactInfoProvided) {
                    setContactInfoRequested(true);
                  } else {
                    applyToProject();
                  }
                }}
              >
                {T("applications.applyButton")}
              </Button>
            </div>
          )
        ) : (
          <Button size={ButtonSize.Md} width={Width.Full} onClick={handleLoginClick}>
            {T("applications.connectToApplyButton")}
          </Button>
        )}
        <p className="text-body-s text-spaceBlue-200">
          {alreadyApplied ? T("applications.informations_already_apply") : T("applications.informations")}
        </p>
      </div>
    </Card>
  );
}

export default ApplyCallout;
