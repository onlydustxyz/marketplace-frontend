import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Only Dust — Forge your developer legacy",
  description:
    "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
  openGraph: {
    title: "Only Dust — Forge your developer legacy",
    description:
      "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
    type: "website",
    siteName: "OnlyDust",
    url: "https://app.onlydust.xyz/",
    images: [
      {
        url: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/thumbnail.png",
        width: 1200,
        height: 628,
        alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@OnlyDust_xyz" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
