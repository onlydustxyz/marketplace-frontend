import { ImageResponse } from "next/og";

import { TGenerator } from "./generator.types";

export async function Generator({ children }: TGenerator.Props) {
  const belwe = fetch(`${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/belwe.ttf`).then(res => res.arrayBuffer());
  const walsheim = fetch(`${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/walsheim.ttf`).then(res =>
    res.arrayBuffer()
  );

  return new ImageResponse(children, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Belwe",
        data: await belwe,
        style: "normal",
        weight: 400,
      },
      {
        name: "Walsheim",
        data: await walsheim,
        style: "normal",
        weight: 400,
      },
    ],
  });
}
