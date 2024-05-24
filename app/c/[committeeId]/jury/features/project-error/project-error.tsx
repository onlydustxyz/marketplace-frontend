import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function ProjectError() {
  const { T } = useIntl();
  const [descStart, descLink, descEnd] = T("v2.pages.committees.project.error.description").split("_");

  return (
    <div className="grid gap-2 text-center">
      <Typography
        variant={"title-s"}
        translate={{
          token: "v2.pages.committees.project.error.title",
        }}
      />
      <Typography variant={"body-m"} className={"text-spaceBlue-200"}>
        {descStart}
        <a className="underline" href={"mailto:contact@onlydust.xyz"}>
          {descLink}
        </a>
        {descEnd}
      </Typography>
    </div>
  );
}
