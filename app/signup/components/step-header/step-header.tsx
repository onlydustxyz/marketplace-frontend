import { Breadcrumbs } from "components/atoms/breadcrumbs";
import { Button } from "components/atoms/button/variants/button-default";
import { Translate } from "components/layout/translate/translate";
import { Stepper } from "components/molecules/stepper";

import { TStepHeader } from "./step-header.types";

export function StepHeader({ step, subStep, stepPath, handleClose }: TStepHeader.Props) {
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

      <div className="flex w-full items-center justify-end gap-2">
        <Stepper
          classNames={{ base: "max-w-56" }}
          steps={[
            { min: 0, max: 100, value: 100 },
            { min: 0, max: 100, value: step > 1 ? 100 : 0 },
            { min: 0, max: 100, value: step > 2 ? 100 : 0 },
          ]}
        />

        {handleClose ? (
          <div>
            <Button
              onClick={handleClose}
              variant="secondary-light"
              size="l"
              hideText
              startIcon={{
                remixName: "ri-close-line",
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
