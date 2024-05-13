import { TIntro } from "app/h/[slug]/features/intro/intro.types";

import { Typography } from "components/layout/typography/typography";

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
