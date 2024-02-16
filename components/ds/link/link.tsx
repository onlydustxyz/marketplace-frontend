import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { Link as InternalLink } from "components/layout/link/link";

import { TLink } from "./link.types";
import { linkVariants } from "./link.variants";

export function Link({ className, children, ...props }: TLink.InternalProps) {
  return (
    <InternalLink className={cn(linkVariants(props), className)} {...props}>
      {({ isExternal }) => (
        <>
          {children}
          {isExternal ? (
            <Icon remixName="ri-external-link-line" className="invisible group-hover/link:visible" />
          ) : null}
        </>
      )}
    </InternalLink>
  );
}

Link.Button = function LinkButton({ className, ...props }: TLink.ButtonProps) {
  return <button className={cn(linkVariants(props), className)} {...props} />;
};
