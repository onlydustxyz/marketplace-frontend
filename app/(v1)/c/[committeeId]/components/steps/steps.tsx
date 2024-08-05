import { ComponentProps } from "react";

import { StepStatus } from "app/(v1)/c/[committeeId]/components/step-status/step-status";
import { TProjectApplicationSteps } from "app/(v1)/c/[committeeId]/components/steps/steps.types";

import { Icon } from "components/layout/icon/icon";

export function Steps({ status }: TProjectApplicationSteps.Props) {
  const progress: ComponentProps<typeof StepStatus>["status"][] = ["pending", "pending", "pending"];

  if (status === "OPEN_TO_APPLICATIONS") {
    progress[0] = "active";
  } else if (status === "OPEN_TO_VOTES") {
    progress[0] = "completed";
    progress[1] = "active";
  } else if (status === "CLOSED") {
    progress[0] = "completed";
    progress[1] = "completed";
    progress[2] = "active";
  }

  return (
    <div className={"flex items-center gap-2"}>
      <StepStatus status={progress[0]} token={"v2.pages.committees.applicant.private.step.applications"} />
      <Icon remixName={"ri-arrow-right-s-line"} className={"text-spaceBlue-400"} />
      <StepStatus status={progress[1]} token={"v2.pages.committees.applicant.private.step.votes"} />
      <Icon remixName={"ri-arrow-right-s-line"} className={"text-spaceBlue-400"} />
      <StepStatus status={progress[2]} token={"v2.pages.committees.applicant.private.step.results"} />
    </div>
  );
}
