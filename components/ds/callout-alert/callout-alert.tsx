import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";

import { TCalloutAlert } from "./callout-alert.types";

export function CalloutAlert({ className, children }: TCalloutAlert.Props) {
  return (
    <Flex className={cn("gap-8 rounded-lg bg-white/8 p-3", className)} alignItems="center">
      {children}
    </Flex>
  );
}
