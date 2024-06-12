import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { TButtonProps } from "./button.types";
import { ButtonCoreVariants } from "./button.variants";

export const ButtonCore = ({
  classNames,
  className,
  as: Component = "button",
  translate,
  startIcon,
  endIcon,
  startContent,
  endContent,
  children,
  isLoading,
  ...props
}: TButtonProps) => {
  const slots = ButtonCoreVariants({ ...props });

  return (
    <Component
      data-state={props.state || "default"}
      {...props}
      className={cn(slots.wrapper(), className, classNames?.wrapper, "group")}
    >
      {startContent ? startContent : null}
      {startIcon ? (
        <Icon size={16} {...startIcon} className={cn(slots.startIcon(), classNames?.startIcon, startIcon.className)} />
      ) : null}
      <Typo size={"xs"} translate={translate} className={cn(slots.content(), classNames?.content)}>
        {children}
      </Typo>
      {endIcon ? (
        <Icon size={16} {...endIcon} className={cn(slots.endIcon(), classNames?.endIcon, endIcon.className)} />
      ) : null}
      {endContent ? endContent : null}
    </Component>
  );
};
