import { PropsWithChildren } from "react";

import { PageBanner } from "app/(v1)/features/page-banner/page-banner";
import V1Providers from "app/(v1)/providers";

import Header from "src/App/Layout/Header";

import SpaceBackground from "components/features/space-background/space-background";
import { RenderByPath } from "components/layout/components-utils/render-by-path/render-by-path";

import { NEXT_ROUTER } from "constants/router";

export default function V1Layout({ children }: PropsWithChildren) {
  return (
    <V1Providers>
      <div className="z-[1] flex h-[calc(100dvh)] w-screen flex-col bg-space-gradient xl:fixed">
        <RenderByPath path={NEXT_ROUTER.signup.root} exact={false} matches={false}>
          <PageBanner />
          <Header />
        </RenderByPath>
        <SpaceBackground />
        {children}
      </div>
    </V1Providers>
  );
}
