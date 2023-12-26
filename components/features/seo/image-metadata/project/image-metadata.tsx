import { ProjectImageMetadataProps } from "./image-metadata.type.ts";
import { ImageMetadataBackground } from "../commons/background/background";
import { ImageMetadataContent } from "../commons/content/content";

export const ProjectImageMetadata = ({ name, description, imageUrl }: ProjectImageMetadataProps) => {
  const image = imageUrl || `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/project-placeholder.png`;
  return (
    <ImageMetadataBackground>
      <ImageMetadataContent title={`Join ${name} on OnlyDust`} description={description} />
      <img
        src={image}
        alt="project-logo"
        width="400"
        height="400"
        style={{
          position: "absolute",
          objectFit: "cover",
          right: -45,
          top: 110,
          border: "24px solid #232338",
          borderRadius: 100,
        }}
      />
    </ImageMetadataBackground>
  );
};
