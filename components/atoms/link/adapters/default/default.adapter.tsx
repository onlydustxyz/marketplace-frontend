import { cn } from "src/utils/cn";

import { LinkCoreVariants } from "components/atoms/link/link.variants";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { LinkPort } from "../../link.types";

export function LinkDefaultAdapter({ classNames, children, ...props }: LinkPort) {
  const { color, ...linkProps } = props;
  const slots = LinkCoreVariants({ color });

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal }) => (
        <>
          {children}
          {isExternal ? (
            <Icon remixName="ri-external-link-line" className="invisible ml-1 text-inherit group-hover/link:visible" />
          ) : null}
        </>
      )}
    </BaseLink>
  );
}
