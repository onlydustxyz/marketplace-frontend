import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";

import { TDotsStatus } from "./dots-status.types";

export function DotsStatus({ status }: TDotsStatus.Props) {
  return (
    <Flex alignItems="center" className="gap-1">
      <span
        className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
          "border-none bg-github-red-light": status === "bad",
        })}
      />

      <span
        className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
          "border-none bg-orange-500": status === "neutral",
        })}
      />

      <span
        className={cn("h-2 w-2 rounded-full border border-card-border-heavy", {
          "border-none bg-struggleBadge-bar-solid-green": status === "good",
        })}
      />
    </Flex>
  );
}
