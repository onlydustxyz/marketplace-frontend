"use client";

import { useMediaQuery } from "usehooks-ts";

import { GridWrapper } from "app/ecosystems/features/all-ecosystems/components/grid-wrapper/grid-wrapper";
import { SliderWrapper } from "app/ecosystems/features/all-ecosystems/components/slider-wrapper/slider-wrapper";

import { viewportConfig } from "src/config";

import { TResponsiveWrapper } from "./responsive-wrapper.types";

export function ResponsiveWrapper({ children }: TResponsiveWrapper.Props) {
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);

  if (isSm) {
    return <SliderWrapper>{children.map(child => child)}</SliderWrapper>;
  }
  return <GridWrapper>{children.map(child => child)}</GridWrapper>;
}
