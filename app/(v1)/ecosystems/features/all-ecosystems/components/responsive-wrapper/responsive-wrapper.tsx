"use client";

import { useMediaQuery } from "usehooks-ts";

import { GridWrapper } from "app/(v1)/ecosystems/features/all-ecosystems/components/grid-wrapper/grid-wrapper";
import { SliderWrapper } from "app/(v1)/ecosystems/features/all-ecosystems/components/slider-wrapper/slider-wrapper";

import { viewportConfig } from "src/config";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TResponsiveWrapper } from "./responsive-wrapper.types";

export function ResponsiveWrapper({ children }: TResponsiveWrapper.Props) {
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const isClient = useClientOnly();

  if (isSm && isClient) {
    return <SliderWrapper>{children.map(child => child)}</SliderWrapper>;
  }

  return <GridWrapper>{children.map(child => child)}</GridWrapper>;
}
