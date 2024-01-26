import { TLink } from "./link.types";
import { HTMLAttributeAnchorTarget } from "react";
import { Icon } from "components/layout/icon/icon";
import { NavLink } from "react-router-dom";
import { cn } from "src/utils/cn";
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

  const targetProps: HTMLAttributeAnchorTarget | undefined = target ? target : isExternal ? "_blank" : undefined;
  const relProps = rel ? rel : isExternal ? "noopener noreferrer" : undefined;

  return (
    <>
      {href ? (
        <NavLink
          to={href}
          target={targetProps}
          rel={relProps}
          className={cn(linkVariants({ ...props }), className)}
          {...props}
        >
          <LinkContent isExternal={isExternal}>{children}</LinkContent>
        </NavLink>
      ) : null}

      {onClick ? (
        <span onClick={onClick} className={cn(linkVariants({ ...props }), "cursor-pointer", className)}>
          <LinkContent isExternal={isExternal}>{children}</LinkContent>
        </span>
      ) : null}
    </>
  );
}
