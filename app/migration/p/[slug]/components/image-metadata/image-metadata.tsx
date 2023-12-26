import { ProjectImageMetadataProps } from "./image-metadata.type.ts";
import { ImageMetadataBackground } from "components/features/seo/image-metadata/background/background.tsx";
import { ImageMetadataContent } from "components/features/seo/image-metadata/content/content.tsx";

export const ProjectImageMetadata = ({ name, description, imageUrl }: ProjectImageMetadataProps) => {
  return (
    <ImageMetadataBackground>
      <ImageMetadataContent title={`Join ${name} on OnlyDust`} description={description} />
      <img
        src={imageUrl}
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
