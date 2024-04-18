import { Typography } from "components/layout/typography/typography";

import { TIntro } from "./intro.types";

export function Intro({ title, subtitle }: TIntro.Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title ? <Typography variant="title-l">{title}</Typography> : null}
      {subtitle ? (
        <Typography variant="body-l" className="text-spaceBlue-200">
          {subtitle}
        </Typography>
      ) : null}
    </div>
  );
}
