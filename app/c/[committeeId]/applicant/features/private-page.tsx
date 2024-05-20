import { useGetCommitteeProjectApplication } from "api-client/resources/committees/queries/use-get-committee-project-application";
import { useParams } from "next/navigation";

import { StepStatus } from "app/c/[committeeId]/applicant/components/step-status/step-status";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeApplicantPrivatePage() {
  const { committeeId } = useParams();
  const { T } = useIntl();

  const { data } = useGetCommitteeProjectApplication({
    committeeId: typeof committeeId === "string" ? committeeId : "",
  });

  // TODO handle loading, error, data

  return (
    <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base max-md:min-h-full md:max-h-full">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div
        // TODO @hayden may need flex/height here for scrolling content
        className={"grid gap-8 p-6 md:p-12"}
      >
        <div className="grid gap-8">
          <div className={"flex items-center gap-2"}>
            {/* TODO @hayden handle correct status */}
            <StepStatus status={"completed"} token={"v2.pages.committees.applicant.private.step.applications"} />
            <Icon remixName={"ri-arrow-right-s-line"} className={"text-spaceBlue-400"} />
            <StepStatus status={"active"} token={"v2.pages.committees.applicant.private.step.votes"} />
            <Icon remixName={"ri-arrow-right-s-line"} className={"text-spaceBlue-400"} />
            <StepStatus status={"pending"} token={"v2.pages.committees.applicant.private.step.results"} />
          </div>

          <div className="grid gap-2">
            <Typography
              variant={"title-m"}
              translate={{ token: "v2.pages.committees.applicant.private.create.title" }}
            />
            <Typography
              variant={"body-s"}
              translate={{ token: "v2.pages.committees.applicant.private.create.description" }}
              className={"text-spaceBlue-200"}
            />
          </div>

          <div>PROJECT SELECT</div>

          <div className={"grid gap-8"}>
            <div className="grid gap-2">
              <Typography
                variant={"title-m"}
                translate={{ token: "v2.pages.committees.applicant.private.questions.title" }}
              />
              <Typography
                variant={"body-s"}
                translate={{ token: "v2.pages.committees.applicant.private.questions.description" }}
                className={"text-spaceBlue-200"}
              />
            </div>

            <div>QUESTIONS</div>
          </div>
        </div>

        {/*<div className="flex flex-1 flex-col overflow-visible md:overflow-auto">*/}
        {/*  <div className="w-full overflow-visible scrollbar-thin scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5 md:w-auto md:overflow-auto">*/}
        {/*    CONTENT*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>

      <footer className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-start justify-end border-t border-card-border-light bg-card-background-base p-6 shadow-medium md:relative md:bottom-auto md:left-auto md:flex-row md:items-center xl:rounded-b-2xl">
        <Button
          type={"submit"}
          size={"l"}
          backgroundColor={"blue"}
          className="w-full md:w-auto"
          // TODO @hayden handle button disabled/loading
        >
          <Icon remixName={"ri-check-line"} size={24} /> {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </div>
  );
}
