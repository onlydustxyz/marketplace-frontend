import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import config from "src/config";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactElement } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.onlydust.com"),
  title: "Only Dust — Forge your developer legacy",
  description:
    "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
  openGraph: {
    title: "Only Dust — Forge your developer legacy",
    description:
      "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
    type: "website",
    siteName: "OnlyDust",
    url: "https://app.onlydust.com",
    images: [
      {
        url: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/thumbnail.png",
        width: 1200,
        height: 628,
        alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@OnlyDust_xyz",
  },
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div id="root">{children}</div>
        </body>
      </UserProvider>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
