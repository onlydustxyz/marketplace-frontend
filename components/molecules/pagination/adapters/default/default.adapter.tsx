import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { PaginationDefaultVariants } from "components/molecules/pagination/adapters/default/default.variants";

import { PaginationPort } from "../../pagination.types";

export function PaginationDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  disablePrev = false,
  disableNext = false,
  total = 0,
  current = 0,
  onNext,
  onPrev,
  isInfinite,
}: PaginationPort<C>) {
  const Component = as || "div";
  const slots = PaginationDefaultVariants();
  const label = isInfinite ? `${current}` : `${current} / ${total}`;
  return (
    <Component className={cn(slots.base(), classNames?.base)}>
      <Button
        size={"l"}
        onClick={onPrev}
        isDisabled={disablePrev}
        hideText
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        variant="secondary-light"
      />
      <Button as={"div"} size={"l"} variant="secondary-light" canInteract={false}>
        {label}
      </Button>
      <Button
        onClick={onNext}
        size={"l"}
        variant="secondary-light"
        isDisabled={disableNext}
        hideText
        startIcon={{ remixName: "ri-arrow-right-s-line" }}
      />
    </Component>
  );
}
