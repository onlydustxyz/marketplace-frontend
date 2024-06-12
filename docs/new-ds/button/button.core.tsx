import { cn } from "src/utils/cn";

import { TButtonCore } from "./button.type";
import { ButtonCoreVariants } from "./button.variant";

export const ButtonCore = ({ text, onClick, classNames, ...props }: TButtonCore.Props) => {
  const slots = ButtonCoreVariants({ ...props });
  return (
    <div className={cn(slots.wrapper(), classNames?.wrapper)} onClick={onClick}>
      {text}
      <div className={cn(slots.icon(), classNames)}></div>
    </div>
  );
};
