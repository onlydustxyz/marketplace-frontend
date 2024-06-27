import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";

import { TPaginationProps } from "../../pagination.types";
import { PaginationDefaultVariants } from "./default.variants";

export function PaginationDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  disablePrev = false,
  disableNext = false,
  total = 0,
  current = 0,
  onNext,
  onPrev,
  infinite,
  buttonProps = {},
}: TPaginationProps<C>) {
  const Component = as || "div";
  const slots = PaginationDefaultVariants();
  const label = infinite ? `${current}` : `${current} / ${total}`;
  return (
    <Component className={cn(slots.base(), classNames?.base)}>
      <Button
        size={"l"}
        onClick={onPrev}
        isDisabled={disablePrev}
        hideText
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        variant="secondary-light"
        {...buttonProps}
      />
      <Button size={"l"} variant="secondary-light" {...buttonProps} as={"div"}>
        {label}
      </Button>
      <Button
        onClick={onNext}
        size={"l"}
        variant="secondary-light"
        isDisabled={disableNext}
        hideText
        startIcon={{ remixName: "ri-arrow-right-s-line" }}
        {...buttonProps}
      />
    </Component>
  );
}
