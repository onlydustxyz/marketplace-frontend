"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { useMatchPath } from "hooks/router/useMatchPath";

interface MenuItemProps extends PropsWithChildren {
  href: string;
}
export default function MenuItem({ href, children }: MenuItemProps) {
  const isActive = useMatchPath(href);

  return (
    <div
      className={cn(
        "align-center relative flex justify-center pb-0.5 text-base outline-4 drop-shadow-lg saturate-200",
        {
          "font-bold text-white": isActive,
          "text-greyscale-500": !isActive,
        }
      )}
    >
      <div className="bg-black py-1">
        <Link href={href}>{children}</Link>
      </div>
      {isActive && (
        <img
          className="absolute inset-x-0 bottom-0 mt-1 h-0.5 w-full"
          src={IMAGES.global.underline}
          alt="Underline"
          loading="lazy"
        />
      )}
    </div>
  );
}
