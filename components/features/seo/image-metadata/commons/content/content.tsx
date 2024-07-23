import { OnlyDustLogo } from "components/features/seo/image-metadata/commons/onlydust-logo/onlydust-logo";

import { TContent } from "./content.types";

export function ImageMetadataContent({ title, description, subtitle }: TContent.Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        justifyContent: "center",
        maxWidth: "700px",
        gap: "24px",
        marginLeft: "72px",
      }}
    >
      <OnlyDustLogo />
      <div
        style={{
          fontSize: "48px",
          fontFamily: "Belwe",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontSize: "32px",
            fontFamily: "Belwe",
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          fontSize: "32px",
          fontFamily: "Walsheim",
        }}
      >
        {description}
      </div>
    </div>
  );
}
