import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Intro from "./Intro";
import Card from "./Card";
import { useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import TechnologiesSelect from "src/components/TechnologiesSelect";
import FormToggle from "src/components/FormToggle";
import { FormProvider, useForm } from "react-hook-form";
import { AllocatedTime } from "src/__generated/graphql";
import FormSelect, { Size } from "src/components/FormSelect";
import ContactInformations from "src/components/ContactInformations";

const MAX_STEP = 3;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const prev = () => setStep(step - 1);
  const next = () => setStep(step + 1);

  const { T } = useIntl();

  const methods = useForm();
  const { control } = methods;

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("onboarding.timeAllocation.none"),
    [AllocatedTime.LessThanOneDay]: T("onboarding.timeAllocation.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("onboarding.timeAllocation.1to3days"),
    [AllocatedTime.MoreThanThreeDays]: T("onboarding.timeAllocation.moreThan3days"),
  };

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} centeredContent>
      <FormProvider {...methods}>
        {step === 0 && <Intro skip={console.log} start={next} />}
        {step === 1 && (
          <Card
            step={step}
            stepCount={MAX_STEP}
            title={T("onboarding.technologies.title")}
            description={T("onboarding.technologies.description")}
            next={next}
          >
            <TechnologiesSelect technologies={{}} setTechnologies={console.log} />
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
            <FormToggle name="lookingForAJob" control={control} label={T("onboarding.timeAllocation.lookingForAJob")} />
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
            <ContactInformations />
          </Card>
        )}
      </FormProvider>
    </Background>
  );
}
