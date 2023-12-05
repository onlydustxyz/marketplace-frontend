import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Intro from "./Intro";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import TechnologiesSelect from "src/components/TechnologiesSelect";
import FormToggle from "src/components/FormToggle";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormSelect, { Size } from "src/components/FormSelect";
import ContactInformations from "src/components/ContactInformations";
import {
  AllocatedTime,
  UserProfileInfo,
  fromFragment,
  mapFormDataToSchema,
} from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/types";
import BaseCard from "src/components/Card";
import SEO from "src/components/SEO";
import MeApi from "src/api/me";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import useMutationAlert from "src/api/useMutationAlert";

const MAX_STEP = 3;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const prev = () => setStep(step - 1);
  const next = () => setStep(step + 1);

  const { T } = useIntl();

  const navigate = useNavigate();

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const { mutate: updateUserMutation } = MeApi.mutations.useUpdateMe({
    options: {
      onSuccess: () => {
        navigate(RoutePaths.Home, { state: { onboardingWizzardCompleted: true } });
      },
    },
  });

  const {
    mutate: updateUserProfileInfo,
    isPending: userProfilInformationIsPending,
    ...restUpdateProfileMutation
  } = MeApi.mutations.useUpdateProfile({
    options: {
      onSuccess: () =>
        updateUserMutation({
          hasSeenOnboardingWizard: true,
        }),
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

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo(mapFormDataToSchema(formData));

  const methods = useForm<UserProfileInfo>({
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (myProfileInfo) reset(fromFragment(myProfileInfo));
  }, [myProfileInfo]);

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("onboarding.timeAllocation.none"),
    [AllocatedTime.LessThanOneDay]: T("onboarding.timeAllocation.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("onboarding.timeAllocation.1to3days"),
    [AllocatedTime.GreaterThanThreeDays]: T("onboarding.timeAllocation.moreThan3days"),
  };

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <FormProvider {...methods}>
          <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-2 pb-6 text-greyscale-50 md:p-6">
            <form id="onboarding-form" className="flex justify-center px-2 xl:pb-4" onSubmit={handleSubmit(onSubmit)}>
              {step === 0 && (
                <Intro
                  skip={() =>
                    updateUserMutation({
                      hasSeenOnboardingWizard: true,
                    })
                  }
                  start={next}
                />
              )}
              {step === 1 && (
                <Card
                  step={step}
                  stepCount={MAX_STEP}
                  title={T("onboarding.technologies.title")}
                  description={T("onboarding.technologies.description")}
                  prev={prev}
                  next={next}
                >
                  <Controller
                    name="technologies"
                    render={({ field: { value, onChange } }) => (
                      <TechnologiesSelect technologies={value} setTechnologies={onChange} />
                    )}
                  />
                </Card>
              )}
              {step === 2 && (
                <Card
                  step={step}
                  stepCount={MAX_STEP}
                  title={T("onboarding.timeAllocation.title")}
                  description={T("onboarding.timeAllocation.description")}
                  private
                  prev={prev}
                  next={next}
                >
                  <div className="flex flex-col gap-6 pt-1">
                    <FormSelect
                      name="weeklyAllocatedTime"
                      options={Object.entries(weeklyTimeAllocations).map(([value, label]) => ({ value, label }))}
                      control={control}
                      size={Size.Lg}
                    />
                    <FormToggle
                      name="lookingForAJob"
                      control={control}
                      label={T("onboarding.timeAllocation.lookingForAJob")}
                    />
                  </div>
                </Card>
              )}
              {step === 3 && (
                <Card
                  step={step}
                  stepCount={MAX_STEP}
                  title={T("onboarding.contact.title")}
                  description={T("onboarding.contact.description")}
                  prev={prev}
                  submit
                  loading={userProfilInformationIsPending}
                >
                  <BaseCard className="bg-white/2">
                    <ContactInformations />
                  </BaseCard>
                </Card>
              )}
            </form>
          </div>
        </FormProvider>
      </Background>
    </>
  );
}
