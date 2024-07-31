import { Spinner } from "@nextui-org/react";

import { useOnboarding } from "src/App/OnboardingProvider";
import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

import { TCta } from "./cta.types";

export function Cta({ title, subtitle, iconProps, wrapperProps = {} }: TCta.Props) {
  const { isLoading } = useOnboarding();

  const { className: iconClassName, ...restIconProps } = iconProps;
  const { classNames: wrapperClassNames, ...restWrapperProps } = wrapperProps;

  return (
    <Paper
      size={"s"}
      container={"transparent"}
      classNames={{
        base: cn("flex items-center gap-3 justify-between text-left", wrapperClassNames?.base, {
          "pointer-events-none": isLoading,
        }),
      }}
      {...restWrapperProps}
    >
      <div className={"flex items-center gap-3"}>
        <Icon
          size={24}
          className={cn(
            "flex h-16 w-16 min-w-16 items-center justify-center rounded-lg border border-container-stroke-separator",
            iconClassName
          )}
          {...restIconProps}
        />

        <div className={"grid"}>
          <Typo size={"l"} weight={"medium"} color={"text-1"} translate={{ token: title }} />
          <Typo size={"s"} color={"text-2"} translate={{ token: subtitle }} />
        </div>
      </div>

      {isLoading ? <Spinner size="sm" /> : <Icon remixName={"ri-arrow-right-s-line"} />}
    </Paper>
  );
}
