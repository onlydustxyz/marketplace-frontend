import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";

import { TTypography } from "./typography.types";
import { getDefaultComponent } from "./typography.utils";
import { typographyVariants } from "./typography.variants";

export function Typography({ variant, className, as, children, translate }: TTypography.Props) {
  const Component = as || getDefaultComponent(variant);

  if (translate) {
    return (
      <Component className={cn(typographyVariants({ variant }), className)}>
        <Translate {...translate} />
        {children}
      </Component>
    );
  }

  return <Component className={cn(typographyVariants({ variant }), className)}>{children}</Component>;
}
