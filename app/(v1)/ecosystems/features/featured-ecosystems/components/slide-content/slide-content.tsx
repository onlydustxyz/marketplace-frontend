"use client";

import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TSlideContent } from "./slide-content.types";

export function SlideContent({ children, smBannerUrl, name }: TSlideContent.Props) {
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const isClient = useClientOnly();

  if (isSm && isClient) {
    return (
      <img
        src={smBannerUrl}
        alt={name}
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-center"
        loading={"lazy"}
      />
    );
  }
  return <>{children}</>;
}
