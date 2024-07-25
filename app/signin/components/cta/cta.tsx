import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

import { TCta } from "./cta.types";

export function Cta({ title, subtitle, iconProps, wrapperProps }: TCta.Props) {
  return (
    <Paper
      size={"s"}
      container={"3"}
      classNames={{ base: cn("flex items-center gap-3 justify-between text-left", wrapperProps?.classNames?.base) }}
      {...wrapperProps}
    >
      <div className={"flex items-center gap-3"}>
        <div
          className={
            "flex h-16 w-16 items-center justify-center rounded-lg border border-container-stroke-separator p-6"
          }
        >
          <Icon size={24} {...iconProps} />
        </div>

        <div className={"grid"}>
          <Typo size={"l"} weight={"medium"} color={"text-1"} translate={{ token: title }} />
          <Typo size={"s"} color={"text-2"} translate={{ token: subtitle }} />
        </div>
      </div>

      <Icon remixName={"ri-arrow-right-s-line"} />
    </Paper>
  );
}
