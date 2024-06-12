import { TZdqCore } from "./zdq.types";
import { ZdqCoreVariants } from "./zdq.variants";
import { cn } from "src/utils/cn";

export const ZdqCore = ({
  classNames,
  as: Component = "div",
  ...props
}: TZdqCore.Props) => {
  const slots = ZdqCoreVariants({ ...props });

  return <Component className={cn(slots.wrapper(), classNames?.wrapper)} />;
};
