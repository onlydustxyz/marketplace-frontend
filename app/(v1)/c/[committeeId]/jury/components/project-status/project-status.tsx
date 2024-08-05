import { TProjectStatus } from "app/(v1)/c/[committeeId]/jury/components/project-status/project-status.types";

import { OnlyDust } from "src/icons/OnlyDust";
import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function ProjectStatus({ score }: TProjectStatus.Props) {
  const hasScore = typeof score === "number";

  return (
    <Typography
      variant={"body-xs-bold"}
      className={cn("flex items-center gap-2 rounded-lg px-2.5 py-1", {
        "bg-struggleBadge-background-green text-struggleBadge-text-green": hasScore,
        "bg-struggleBadge-background-red text-struggleBadge-text-red": !hasScore,
      })}
    >
      {hasScore ? (
        <>
          {score} <OnlyDust className={"h-3.5 w-3.5"} />
        </>
      ) : (
        <Translate token={"v2.pages.committees.jury.private.notStarted"} />
      )}
    </Typography>
  );
}
