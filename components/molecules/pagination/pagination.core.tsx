import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";

import { TPaginationProps } from "./pagination.types";
import { PaginationCoreVariants } from "./pagination.variants";

export function PaginationCore<C extends ElementType = "div">({
  classNames,
  as,
  disablePrev = false,
  disableNext = false,
  total = 0,
  current = 0,
  onNext,
  onPrev,
  infinite,
  buttonProps,
  ...props
}: TPaginationProps<C>) {
  const Component = as || "div";
  const { ...htmlProps } = props;
  const slots = PaginationCoreVariants();
  const label = infinite ? `${current}` : `${current} / ${total}`;
  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <ButtonSecondaryLight
        size={"l"}
        onClick={onPrev}
        isDisabled={disablePrev}
        hideText
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        {...(buttonProps || {})}
      />
      <ButtonSecondaryLight size={"l"} {...(buttonProps || {})} as={"div"}>
        {label}
      </ButtonSecondaryLight>
      <ButtonSecondaryLight
        onClick={onNext}
        size={"l"}
        isDisabled={disableNext}
        hideText
        startIcon={{ remixName: "ri-arrow-right-s-line" }}
        {...(buttonProps || {})}
      />
    </Component>
  );
}
