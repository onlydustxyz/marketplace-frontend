import { PropsWithChildren } from "react";

export const ImageMetadataBackground = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        // background: `url(${env_variables.METADATA_ASSETS_S3_BUCKET}/metadata_background.png)`, TODO
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
