import { Breadcrumbs } from "components/atoms/breadcrumbs";
import { Translate } from "components/layout/translate/translate";

import { TStepHeader } from "./step-header.types";

export function StepHeader({ step, subStep, stepPath }: TStepHeader.Props) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-1">
      <Breadcrumbs
        items={[
          {
            id: "step-root",
            label: <Translate token="v2.pages.signup.onboarding.common.step" params={{ step }} />,
            href: stepPath,
          },
          ...(subStep ? [{ id: "step-sub", label: <Translate {...subStep} /> }] : []),
        ]}
      />
    </div>
  );
}
