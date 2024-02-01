import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "remixicon/fonts/remixicon.css";

import Providers from "app/providers";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import config from "src/config";

import { PosthogIdentifyUser } from "components/features/posthog/components/posthog-identify-user";
import { PosthogPageView } from "components/features/posthog/components/posthog-page-view";

import { sharedMetadata } from "./shared-metadata";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-[calc(100dvh)] bg-space-new bg-no-repeat">
        <Providers>
          {/*<Header />*/}
          <div id="root">{children}</div>
          <PosthogIdentifyUser />
          <PosthogPageView />
        </Providers>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
