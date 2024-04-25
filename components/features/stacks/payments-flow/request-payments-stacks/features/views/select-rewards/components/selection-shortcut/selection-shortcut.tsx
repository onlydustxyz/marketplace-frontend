import { cn } from "src/utils/cn";

import { Link } from "components/ds/link/link";
import { Flex } from "components/layout/flex/flex";

import { TSelectionShortcut } from "./selection-shortcut.types";

export function SelectionShortcut({
  excludedRewards,
  includedRewards,
  onExcludeAll,
  onIncludeAll,
}: TSelectionShortcut.Props) {
  return (
    <Flex justifyContent={"end"} alignItems={"center"} className="gap-2">
      <Link.Button
        className={cn(" text-spacePurple-500", {
          "pointer-events-none !text-spaceBlue-300": !excludedRewards.length,
        })}
        onClick={onIncludeAll}
      >
        Select all
      </Link.Button>
      <Link.Button
        className={cn("border-l border-l-card-border-light pl-2 text-spacePurple-500", {
          "pointer-events-none !text-spaceBlue-300": !includedRewards.length,
        })}
        onClick={onExcludeAll}
      >
        Deselect all
      </Link.Button>
    </Flex>
  );
}
