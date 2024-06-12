import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";

import { TTypoProps } from "./typo.types";
import { TypoCoreVariants } from "./typo.variants";

export const TypoCore = ({ classNames, translate, className, children, as: Component = "p", ...props }: TTypoProps) => {
  const slots = TypoCoreVariants({ ...props });

  return (
    <>
      <Component {...props} className={cn(slots.main(), className, classNames?.main)}>
        {translate ? <Translate {...translate} /> : null}
        {children}
      </Component>
    </>
  );
};
