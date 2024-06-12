import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";

import { TTypoCore } from "./typo.types";
import { TypoCoreVariants } from "./typo.variants";

export const TypoCore = ({
  classNames,
  translate,
  className,
  children,
  as: Component = "p",
  ...props
}: TTypoCore.Props) => {
  const slots = TypoCoreVariants({ ...props });

  return (
    <Component className={cn(slots.main(), className, classNames?.main)}>
      {translate ? <Translate {...translate} /> : null}
      {children}
    </Component>
  );
};
