import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Intro from "./Intro";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import TechnologiesSelect from "src/components/TechnologiesSelect";
import FormToggle from "src/components/FormToggle";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  AllocatedTime,
  GetOnboardingStateDocument,
  GetOnboardingStateQuery,
  OwnUserProfileDocument,
  useMarkProfileWizardAsDisplayedMutation,
  useOwnUserProfileQuery,
  useUpdateUserProfileMutation,
} from "src/__generated/graphql";
import FormSelect, { Size } from "src/components/FormSelect";
import ContactInformations from "src/components/ContactInformations";
import {
  UserProfileInfo,
  fromFragment,
  toVariables,
} from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/types";
import { useAuth } from "src/hooks/useAuth";
import BaseCard from "src/components/Card";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/components/App";
import SEO from "src/components/SEO";

const MAX_STEP = 3;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const prev = () => setStep(step - 1);
  const next = () => setStep(step + 1);

  const { T } = useIntl();

  const { githubUserId, user } = useAuth();
  const navigate = useNavigate();

  const { data } = useOwnUserProfileQuery({
    variables: { githubUserId },
  });

  const [updateUserProfileInfo] = useUpdateUserProfileMutation({
    refetchQueries: [{ query: OwnUserProfileDocument, variables: { githubUserId } }],
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => markWizzardAsCompleted(),
  });

  const [markWizzardAsCompleted] = useMarkProfileWizardAsDisplayedMutation({
    context: { graphqlErrorDisplay: "toaster" },
    update: cache => {
      const cachedData = cache.readQuery<GetOnboardingStateQuery>({
        query: GetOnboardingStateDocument,
        variables: { userId: user?.id },
      });
      cache.writeQuery({
        query: GetOnboardingStateDocument,
        variables: { userId: user?.id },
        data: {
          onboardingsByPk: {
            userId: user?.id,
            termsAndConditionsAcceptanceDate: cachedData?.onboardingsByPk?.termsAndConditionsAcceptanceDate || null,
            profileWizardDisplayDate: new Date(),
          },
        },
      });
    },
    onCompleted: () => navigate(RoutePaths.Home, { state: { onboardingWizzardCompleted: true } }),
  });

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo({ variables: toVariables(formData) });

  const profile = data?.userProfiles.at(0);

  const methods = useForm<UserProfileInfo>({
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (profile) reset(fromFragment(profile));
  }, [profile]);

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("onboarding.timeAllocation.none"),
    [AllocatedTime.LessThanOneDay]: T("onboarding.timeAllocation.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("onboarding.timeAllocation.1to3days"),
    [AllocatedTime.MoreThanThreeDays]: T("onboarding.timeAllocation.moreThan3days"),
  };

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <FormProvider {...methods}>
          <form id="onboarding-form" className="flex justify-center px-2 xl:pb-4" onSubmit={handleSubmit(onSubmit)}>
            {step === 0 && <Intro skip={markWizzardAsCompleted} start={next} />}
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
                  name="languages"
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
              >
                <BaseCard className="bg-white/2">
                  <ContactInformations />
                </BaseCard>
              </Card>
            )}
          </form>
        </FormProvider>
      </Background>
    </>
  );
}
