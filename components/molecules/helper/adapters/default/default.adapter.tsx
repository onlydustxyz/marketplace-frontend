import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { RenderWithProps } from "components/layout/components-utils/render-with-props/render-with-props";

import { HelperPort } from "../../helper.types";
import { HelperDefaultVariants } from "./default.variants";

export function HelperDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  title,
  avatar,
  text,
  endContent,
  startContent,
  startButton,
  endButton,
  ...props
}: HelperPort<C>) {
  const Component = as || "div";
  const { container, size, layout } = props;
  const slots = HelperDefaultVariants({ container, size, layout });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {startContent}
      <RenderWithProps Component={Avatar} props={avatar} overrideProps={{ size: "xl", shape: "square" }} />
      <div className="flex flex-col items-start justify-start gap-1">
        <RenderWithProps Component={Typo} props={title} overrideProps={{ size: "m", variant: "brand" }} />
        <RenderWithProps Component={Typo} props={text} overrideProps={{ size: "s" }} />
      </div>
      <div className={cn(slots.endContainer(), classNames?.endContainer)}>
        <RenderWithProps
          Component={Button}
          props={startButton}
          overrideProps={{ size: "l", variant: "secondary-light" }}
        />
        <RenderWithProps
          Component={Button}
          props={endButton}
          overrideProps={{ size: "l", variant: "secondary-light" }}
        />
        {endContent}
      </div>
    </Component>
  );
}
