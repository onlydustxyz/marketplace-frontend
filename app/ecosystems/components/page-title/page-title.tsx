"use client";

import { viewportConfig } from "src/config";

import { Container } from "components/layout/container/container";
import { Typography } from "components/layout/typography/typography";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function PageTitle() {
  const isSm = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return (
    <Container>
      <Typography variant={isSm ? "title-xl" : "title-l"} translate={{ token: "v2.pages.ecosystems.list.pageTitle" }} />
    </Container>
  );
}
