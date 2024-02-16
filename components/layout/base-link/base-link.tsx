import NextLink from "next/link";

import { cn } from "src/utils/cn";

import { useMatchPath } from "hooks/router/useMatchPath";

import { TBaseLink } from "./base-link.types";

export function BaseLink({ href, target, rel, className, children, matchPathOptions, ...props }: TBaseLink.Props) {
  const isExternal = href.toString().startsWith("http") ?? false;
  const isActive = useMatchPath(String(href), matchPathOptions);

  const targetExternal = isExternal ? "_blank" : undefined;
  const targetProps = target || targetExternal;

  const relExternal = isExternal ? "noopener noreferrer" : undefined;
  const relProps = rel || relExternal;

  return (
    <NextLink
      href={href}
      target={targetProps}
      rel={relProps}
      className={cn("group/link", className)}
      data-active={isActive}
      {...props}
    >
      {typeof children === "function" ? children?.({ isExternal, isActive }) : children}
    </NextLink>
  );
}
