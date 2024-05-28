import { cn } from "@nextui-org/react";

import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";

import { Button } from "components/ds/button/button";
import { TError } from "components/layout/error/error.types";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function Error({ title, message, onBack, onRefresh }: TError.Props) {
  const { T } = useIntl();

  return (
    <div className={"grid w-full place-items-center gap-8"}>
      <OnlyDustCrashedLogo />

      <div className="grid gap-4 text-center">
        <Typography variant={"title-l"}>{title}</Typography>
        {message ? (
          <Typography variant={"body-l"} className={"text-greyscale-100"}>
            {message}
          </Typography>
        ) : null}
      </div>

      {onBack || onRefresh ? (
        <div className={cn("grid w-full gap-4", onBack && onRefresh ? "sm:grid-cols-2" : "place-items-center")}>
          {onBack ? (
            <Button
              type={"button"}
              variant={"secondary"}
              onClick={onBack}
              className={cn({
                "w-full": onRefresh,
              })}
            >
              <Icon remixName={"ri-arrow-left-s-line"} size={20} /> {T("v2.commons.globalState.error.back")}
            </Button>
          ) : null}

          {onRefresh ? (
            <Button
              type={"button"}
              onClick={onRefresh}
              className={cn({
                "w-full": onBack,
              })}
            >
              <Icon remixName={"ri-refresh-line"} size={20} /> {T("v2.commons.globalState.error.refresh")}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
