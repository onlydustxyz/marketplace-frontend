import { TUserImageMetadata } from "./image-metadata.types";
import { ImageMetadataBackground } from "../commons/background/background";
import { ImageMetadataContent } from "../commons/content/content";

export function UserImageMetadata({ name, description, imageUrl }: TUserImageMetadata.Props) {
  const image = imageUrl || `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/project-placeholder.png`;
  const _description =
    description ||
    "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community.";

  return (
    <ImageMetadataBackground>
      <ImageMetadataContent title={`Join ${name} on OnlyDust`} description={_description} />
      <img
        src={imageUrl || image}
        alt="user-picture"
        width="400"
        height="400"
        style={{
          position: "absolute",
          right: -45,
          objectFit: "cover",
          top: 110,
          border: "24px solid #232338",
          borderRadius: 10000,
        }}
      />
    </ImageMetadataBackground>
  );
}
