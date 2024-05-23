import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { Steps } from "app/c/[committeeId]/applicant/features/steps/steps";
import { ProjectsAccordion } from "app/c/[committeeId]/jury/features/projects-accordion/projects-accordion";

import { BaseLink } from "components/layout/base-link/base-link";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function CommitteeJuryPrivatePage() {
  const { T } = useIntl();
  const { committeeId } = useParams();
  const { user } = useCurrentUser();

  const { data, isLoading, isError } = meApiClient.queries.useGetMyCommitteeAssignments(
    typeof committeeId === "string" ? committeeId : ""
  );

  if (isError) {
    // TODO
    return "Error";
  }

  if (isLoading) {
    // TODO
    return "Loading";
  }

  if (!data) {
    // TODO
    return "Empty";
  }

  const [descStart, descEnd] = T("v2.pages.committees.jury.description").split("__link__");
  const description = [
    descStart,
    <BaseLink key={"@GregGamb"} href={"https://t.me/GregGamb"} className={"text-spacePurple-500"}>
      @GregGamb
    </BaseLink>,
    descEnd,
  ];

  return (
    <form className="relative flex w-[740px] max-w-full flex-col overflow-hidden rounded-2xl bg-card-background-base shadow-light">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"grid gap-8 p-6 md:p-12"}>
        <div className="grid gap-8">
          <Steps status={data.status} />

          <div className="grid gap-4">
            <Typography variant={"title-l"}>{data.name}</Typography>

            <div className="grid gap-2">
              <Typography variant={"title-m"} translate={{ token: "v2.pages.committees.jury.title" }} />
              <Typography
                variant={"body-s"}
                translate={{
                  token: "v2.pages.committees.jury.subtitle",
                  params: {
                    name: user?.firstName || user?.login || T("v2.pages.committees.jury.subtitleNamePlaceholder"),
                    projects: data.projectAssignments.length,
                  },
                }}
              />
            </div>

            <Typography variant={"body-s"} className={"whitespace-pre-line leading-normal text-spaceBlue-200"}>
              {description}
            </Typography>
          </div>

          {/* TODO handle different steps */}
          <ProjectsAccordion projectAssignments={data.projectAssignments} />
        </div>
      </div>
    </form>
  );
}
