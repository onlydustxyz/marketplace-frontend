import { ImageResponse } from "next/og";
import { ProjectImageMetadata } from "./components/image-metadata/image-metadata.tsx";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  // const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <ProjectImageMetadata
        name="coucou"
        description={"coucou description"}
        imageUrl="https://avatars.githubusercontent.com/u/16590657"
      />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await interSemiBold,
      //     style: "normal",
      //     weight: 400,
      //   },
      // ],
    }
  );
}
