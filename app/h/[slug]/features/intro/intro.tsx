import { TIntro } from "app/h/[slug]/features/intro/intro.types";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Typography } from "components/layout/typography/typography";

export function Intro({ title }: TIntro.Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title ? <Typography variant="title-l">{title}</Typography> : null}
    </div>
  );
}

export function IntroLoading() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      <SkeletonEl width="200px" height="36px" variant="rounded" />
      <SkeletonEl width="420" height="24px" variant="rounded" />
    </div>
  );
}
