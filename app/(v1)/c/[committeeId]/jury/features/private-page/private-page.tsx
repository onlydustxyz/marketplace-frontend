import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { Steps } from "app/(v1)/c/[committeeId]/components/steps/steps";
import { CommitteeErrorPage } from "app/(v1)/c/[committeeId]/features/error-page/error-page";
import { CommitteeLoadingPage } from "app/(v1)/c/[committeeId]/features/loading-page/loading-page";
import { ProjectsAccordion } from "app/(v1)/c/[committeeId]/jury/features/projects-accordion/projects-accordion";
import { CommitteeContext } from "app/(v1)/c/[committeeId]/utils/committee-context";

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
    return <CommitteeErrorPage type={"jury"} />;
  }

  if (isLoading) {
    return <CommitteeLoadingPage />;
  }

  if (!data) {
    return <CommitteeErrorPage type={"jury"} />;
  }

  const [descStart, descEnd] = T("v2.pages.committees.jury.private.description").split("__link__");
  const description = [
    descStart,
    <BaseLink key={"@GregGamb"} href={"https://t.me/GregGamb"} className={"text-spacePurple-500"}>
      @GregGamb
    </BaseLink>,
    descEnd,
  ];

  return (
    <div className="relative m-auto flex w-full max-w-[740px] flex-col overflow-hidden rounded-none bg-card-background-base shadow-light sm:rounded-2xl">
      <div className="hidden w-full bg-mosaic bg-cover pb-1.5 sm:block" />

      <div className={"grid gap-8 p-2 py-6 sm:p-6 md:p-12"}>
        <div className="grid gap-8">
          <Steps status={data.status} />

          <div className="grid gap-4">
            <Typography variant={"title-l"}>{data.name}</Typography>

            <div className="grid gap-2">
              <Typography variant={"title-m"} translate={{ token: "v2.pages.committees.jury.private.title" }} />
              <Typography
                variant={"body-s"}
                translate={{
                  token: "v2.pages.committees.jury.private.subtitle",
                  params: {
                    name:
                      user?.firstName || user?.login || T("v2.pages.committees.jury.private.subtitleNamePlaceholder"),
                    projects: data.projectAssignments.length,
                  },
                }}
              />
            </div>

            <Typography variant={"body-s"} className={"whitespace-pre-line leading-normal text-spaceBlue-200"}>
              {description}
            </Typography>
          </div>

          <CommitteeContext.Provider value={{ status: data.status }}>
            <ProjectsAccordion projectAssignments={data.projectAssignments} />
          </CommitteeContext.Provider>
        </div>
      </div>
    </div>
  );
}
