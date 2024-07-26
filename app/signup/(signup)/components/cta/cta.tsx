import { TCta } from "app/signup/(signup)/components/cta/cta.types";

import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

export function Cta({ title, subtitle, iconProps, wrapperProps }: TCta.Props) {
  const { className: iconClassName, ...restIconProps } = iconProps;

  return (
    <Paper
      size={"s"}
      container={"3"}
      classNames={{ base: cn("flex items-center gap-3 justify-between text-left", wrapperProps?.classNames?.base) }}
      {...wrapperProps}
    >
      <div className={"flex items-center gap-3"}>
        <Icon
          size={24}
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-lg border border-container-stroke-separator",
            iconClassName
          )}
          {...restIconProps}
        />

        <div className={"grid"}>
          <Typo size={"l"} weight={"medium"} color={"text-1"} translate={{ token: title }} />
          <Typo size={"s"} color={"text-2"} translate={{ token: subtitle }} />
        </div>
      </div>

      <Icon remixName={"ri-arrow-right-s-line"} />
    </Paper>
  );
}
