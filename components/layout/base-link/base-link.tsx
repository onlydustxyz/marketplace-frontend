"use client";

import NextLink from "next/link";
import { MouseEvent } from "react";

import { cn } from "src/utils/cn";

import { useMatchPath } from "hooks/router/useMatchPath";

import { TBaseLink } from "./base-link.types";

export function BaseLink({
  href,
  target,
  rel,
  className,
  children,
  matchPathOptions,
  onClick,
  ...props
}: TBaseLink.Props) {
  const isExternal = href?.toString()?.startsWith("http") ?? false;
  const isActive = useMatchPath(String(matchPathOptions?.pattern || href), matchPathOptions);

  const targetExternal = isExternal ? "_blank" : undefined;
  const targetProps = target || targetExternal;

  const relExternal = isExternal ? "noopener noreferrer" : undefined;
  const relProps = rel || relExternal;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
  }

  return (
    <NextLink
      href={href}
      target={targetProps}
      rel={relProps}
      className={cn("group/link", className)}
      data-active={isActive}
      onClick={handleClick}
      prefetch={true}
      {...props}
    >
      {typeof children === "function" ? children?.({ isExternal, isActive }) : children}
    </NextLink>
  );
}
