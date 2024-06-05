"use client";

import { PropsWithChildren } from "react";

import { viewportConfig } from "src/config";

import { Typography } from "components/layout/typography/typography";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function PageTitle({ children }: PropsWithChildren) {
  const isSm = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return <Typography variant={isSm ? "title-xl" : "title-l"}>{children}</Typography>;
}
