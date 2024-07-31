import { cn } from "src/utils/cn";

import { LinkDefaultVariants } from "components/atoms/link/adapters/default/default.variants";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { LinkPort } from "../../link.types";

export function LinkDefaultAdapter({ classNames, children, ...props }: LinkPort) {
  const { color, ...linkProps } = props;
  const slots = LinkDefaultVariants({ color });

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal, isExternalIconVisible }) => (
        <>
          {children}
          {isExternal ? (
            <Icon
              remixName="ri-external-link-line"
              className={cn("ml-1 text-inherit", {
                "invisible group-hover/link:visible": !isExternalIconVisible,
              })}
            />
          ) : null}
        </>
      )}
    </BaseLink>
  );
}
