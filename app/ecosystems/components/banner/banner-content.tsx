"use client";

import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TBanner } from "./banner.types";

export function BannerContent({ children, smBannerUrl, name }: TBanner.PropsContent) {
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const isClient = useClientOnly();

  if (isSm && isClient) {
    return (
      <Image
        src={smBannerUrl}
        alt={name}
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-center"
        loading={"lazy"}
        width={290}
        height={134}
      />
    );
  }
  return <>{children}</>;
}
