import { OGActivityGraph } from "components/features/seo/image-metadata/public-profile/components/activity/activity-graph";
import { OgContent } from "components/features/seo/image-metadata/public-profile/components/content/content";

import { THackathonImageMetadataProps } from "./image-metadata.types";

export function PublicProfileImageMetadata({ title, login, image, data }: THackathonImageMetadataProps.Props) {
  const backgroundUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/profile-opengraph-background.png`;
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
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
          paddingLeft: 72,
          paddingRight: 63,
        }}
      >
        <OgContent image={image} login={login} title={title} />
        <OGActivityGraph data={data} />
      </div>
    </div>
  );
}
