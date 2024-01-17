import { GoogleTagManager } from "@next/third-parties/google";
import { PHProvider } from "components/providers/PHProvider.tsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata.ts";

const PostHogPageView = dynamic(() => import("../components/vendors/PostHogPageView"), {
  ssr: false,
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <div id="root">{children}</div>
          <PostHogPageView />
        </body>
      </PHProvider>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
