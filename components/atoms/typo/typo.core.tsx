import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";

import { TTypoProps } from "./typo.types";
import { TypoCoreVariants } from "./typo.variants";

export const TypoCore = ({ classNames, translate, children, as: Component = "span", ...props }: TTypoProps<"span">) => {
  const slots = TypoCoreVariants({ ...props });

  return (
    <Component {...props} className={cn(slots.base(), classNames?.base)}>
      {translate ? <Translate {...translate} /> : children}
    </Component>
  );
};
