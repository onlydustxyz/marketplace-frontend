import { TGenericTextOnlyImageMetadataProps } from "components/features/seo/image-metadata/generic-text-only/image-metadata.types";

import { ImageMetadataContent } from "../commons/content/content";

export function GenericTextOnlyImageMetadata({ ...props }: TGenericTextOnlyImageMetadataProps.Props) {
  const backgroundUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/hackathon-opengraph.jpg`;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "black",
        zIndex: 1,
      }}
    >
      <img
        src={backgroundUrl}
        alt="background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          zIndex: 2,
          paddingLeft: 72,
        }}
      >
        <ImageMetadataContent {...props} />
      </div>
    </div>
  );
}
