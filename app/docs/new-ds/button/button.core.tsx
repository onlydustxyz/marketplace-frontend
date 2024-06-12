import { ComponentProps } from "react";

import { ButtonCoreInterface } from "app/migration/home/button-v1/button.type";
import { ButtonCoreVariants } from "app/migration/home/button-v1/button.variant";

import { cn } from "src/utils/cn";

export const ButtonCore = ({ text, onClick, classNames, ...props }: ButtonCoreInterface) => {
  const slots = ButtonCoreVariants({ ...props });
  return (
    <div className={cn(slots.wrapper(), classNames.wrapper)} onClick={onClick}>
      {text}
      <div className={cn(slots.icon(), classNames)}></div>
    </div>
  );
};

export type ButtonCoreProps = ComponentProps<typeof ButtonCore>;
