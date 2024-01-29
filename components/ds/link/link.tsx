import { HTMLAttributeAnchorTarget } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

import { TLink } from "./link.types";
import { linkVariants } from "./link.variants";

function LinkContent({ children, isExternal }: TLink.LinkContentProps) {
  return (
    <>
      {children}

      {isExternal ? <Icon remixName="ri-external-link-line" className="invisible group-hover/link:visible" /> : null}
    </>
  );
}

// TODO: Change to next/link after the migration
export function Link({ href, target, rel, onClick, children, className, ...props }: TLink.Props) {
  const isExternal = href?.toString().startsWith("http") ?? false;

  const targetExternal: HTMLAttributeAnchorTarget | undefined = isExternal ? "_blank" : undefined;
  const targetProps = target || targetExternal;

  const relExternal = isExternal ? "noopener noreferrer" : undefined;
  const relProps = rel || relExternal;

  if (href) {
    return (
      <NavLink
        to={href}
        target={targetProps}
        rel={relProps}
        className={cn(linkVariants({ ...props }), className)}
        {...props}
      >
        <LinkContent isExternal={isExternal}>{children}</LinkContent>
      </NavLink>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(linkVariants({ ...props }), className)}>
        <LinkContent isExternal={isExternal}>{children}</LinkContent>
      </button>
    );
  }

  return null;
}
