import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";

import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeErrorPage() {
  const { T } = useIntl();
  const [descStart, descLink, descEnd] = T("v2.pages.committees.applicant.private.error.description").split("_");

  return (
    <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"grid place-items-center gap-8 p-12"}>
        <OnlyDustCrashedLogo />

        <div className="grid gap-4 text-center">
          <Typography variant={"title-l"} translate={{ token: "v2.pages.committees.applicant.private.error.title" }} />
          <Typography variant={"body-l"} className={"text-spaceBlue-200"}>
            {descStart}
            <a className="underline" href={"mailto:contact@onlydust.xyz"}>
              {descLink}
            </a>
            {descEnd}
          </Typography>
        </div>
      </div>
    </div>
  );
}
