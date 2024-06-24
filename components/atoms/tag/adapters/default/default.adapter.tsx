import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { RenderWithProps } from "components/layout/components-utils/render-with-props/render-with-props";
import { Show } from "components/layout/components-utils/show/show";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TagPort } from "../../tag.types";
import { TagDefaultVariants } from "./default.variants";

export function TagDefaultAdapter<C extends ElementType = "span">({
  classNames,
  startContent,
  as,
  children,
  endContent,
  htmlProps,
  translate,
  labelProps = {},
  deletableIconProps = {},
  ...props
}: TagPort<C>) {
  const { isDeletable, hideText = false, shape, size, color, style } = props;
  const Component = as || isDeletable ? "button" : "span";
  const slots = TagDefaultVariants({ isDeletable, hideText, shape, size, color, style });

  const showChildren = !hideText && (!!children || !!translate);

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}

        <Show show={showChildren}>
          <Typo size={"xs"} as={"span"} {...labelProps} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || <RenderWithProps Component={Translate} props={translate} />}
          </Typo>
        </Show>

        {endContent}

        <Show show={!!isDeletable}>
          <Icon
            remixName="ri-close-circle-line"
            size={16}
            {...deletableIconProps}
            className={cn(slots.deletableIcon(), classNames?.deletableIcon)}
          />
        </Show>
      </div>
    </Component>
  );
}
