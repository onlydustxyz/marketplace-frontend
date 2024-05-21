import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";

import { TDotsStatus } from "./dots-status.types";

export function DotsStatus({ status }: TDotsStatus.Props) {
  return (
    <Flex alignItems="center" className="gap-1">
      <Tooltip key="RED" content={<Translate token="v2.features.dotStatus.red" />} enabled={status === "RED"}>
        <span
          className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
            "border-none bg-github-red-light": status === "RED",
          })}
        />
      </Tooltip>

      <Tooltip key="ORANGE" content={<Translate token="v2.features.dotStatus.orange" />} enabled={status === "ORANGE"}>
        <span
          className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
            "border-none bg-orange-500": status === "ORANGE",
          })}
        />
      </Tooltip>

      <Tooltip key="GREEN" content={<Translate token="v2.features.dotStatus.green" />} enabled={status === "GREEN"}>
        <span
          className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
            "border-none bg-struggleBadge-bar-solid-green": status === "GREEN",
          })}
        />
      </Tooltip>
    </Flex>
  );
}
