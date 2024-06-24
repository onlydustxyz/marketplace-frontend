import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { TLinkProps } from "./link.types";
import { LinkCoreVariants } from "./link.variants";

export function LinkCore({ classNames, children, ...props }: TLinkProps) {
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
