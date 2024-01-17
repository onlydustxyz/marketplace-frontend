import { GoogleTagManager } from "@next/third-parties/google";
import { PHProvider } from "components/providers/PHProvider.tsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata.ts";

const PostHogNext = dynamic(() => import("components/vendors/PostHogNext"), {
  ssr: false,
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PHProvider>
          <div id="root">{children}</div>
          <PostHogNext />
        </PHProvider>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
