import { OGActivityGraph } from "components/features/seo/image-metadata/public-profile/components/activity/activity-graph";
import { OgContent } from "components/features/seo/image-metadata/public-profile/components/content/content";
import { Wrapper } from "components/features/seo/image-metadata/public-profile/components/wrapper";

import { THackathonImageMetadataProps } from "./image-metadata.types";

export function PublicProfileImageMetadata({
  title,
  login,
  image,
  data,
  topLanguages,
  topEcosystem,
}: THackathonImageMetadataProps.Props) {
  return (
    <Wrapper>
      <OgContent image={image} login={login} title={title} topLanguages={topLanguages} topEcosystem={topEcosystem} />
      <OGActivityGraph data={data} />
    </Wrapper>
  );
}
