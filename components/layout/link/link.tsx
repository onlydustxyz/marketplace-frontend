import NextLink from "next/link";

import { cn } from "src/utils/cn";

import { TLink } from "./link.types";

export function Link({ href, target, rel, className, children, ...props }: TLink.Props) {
  const isExternal = href.toString().startsWith("http") ?? false;

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
      // TODO match path
      // data-active={true}
      {...props}
    >
      {children?.({ isExternal })}
    </NextLink>
  );
}
