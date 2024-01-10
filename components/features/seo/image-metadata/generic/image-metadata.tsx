import { ImageMetadataBackground } from "../commons/background/background";
import { ImageMetadataContent } from "../commons/content/content";

export function GenericImageMetadata() {
  const imageUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cards.png`;

  return (
    <ImageMetadataBackground>
      <ImageMetadataContent
        title="Forge your developer legacy"
        description="Contribute to innovative projects, refine your skills and create a lasting impact in the developer community."
      />
      <img
        src={imageUrl}
        alt="cards"
        width="359"
        height="600"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
    </ImageMetadataBackground>
  );
}
