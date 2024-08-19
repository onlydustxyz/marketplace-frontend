import { Breadcrumbs } from "components/atoms/breadcrumbs";
import { Translate } from "components/layout/translate/translate";
import { Stepper } from "components/molecules/stepper";

import { TStepHeader } from "./step-header.types";

export function StepHeader({ step, subStep, stepPath }: TStepHeader.Props) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-3">
      <div className="whitespace-nowrap">
        <Breadcrumbs
          items={[
            {
              id: "step-root",
              label: <Translate token="v2.pages.signup.onboarding.common.step" params={{ step }} />,
              href: stepPath,
            },
            ...(subStep ? [{ id: "step-sub", label: <Translate {...subStep} /> }] : []),
          ]}
          classNames={{ base: "capitalize" }}
        />
      </div>

      <Stepper
        classNames={{ base: "max-w-56" }}
        steps={[
          { min: 0, max: 100, value: 100 },
          { min: 0, max: 100, value: step > 1 ? 100 : 0 },
          { min: 0, max: 100, value: step > 2 ? 100 : 0 },
        ]}
      />
    </div>
  );
}
