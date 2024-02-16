import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { TLink } from "./link.types";
import { linkVariants } from "./link.variants";

export function Link({ className, children, ...props }: TLink.LinkProps) {
  return (
    <BaseLink className={cn(linkVariants(props), className)} {...props}>
      {({ isExternal }) => (
        <>
          {children}
          {isExternal ? (
            <Icon remixName="ri-external-link-line" className="invisible group-hover/link:visible" />
          ) : null}
        </>
      )}
    </BaseLink>
  );
}

Link.Button = function LinkButton({ className, ...props }: TLink.ButtonProps) {
  return <button className={cn(linkVariants(props), className)} {...props} />;
};
