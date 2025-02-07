import { OGActivityGraph } from "components/features/seo/image-metadata/public-profile/components/activity/activity-graph";
import { OgContent } from "components/features/seo/image-metadata/public-profile/components/content/content";
import { Wrapper } from "components/features/seo/image-metadata/public-profile/components/wrapper";

import { TPublicProfileImageMetadata } from "./image-metadata.types";

export function PublicProfileImageMetadata({
  title,
  login,
  image,
  data,
  rank,
  rankPercentile,
  topLanguages,
  rewardsCount,
  contributionCount,
  topEcosystem,
}: TPublicProfileImageMetadata.Props) {
  return (
    <Wrapper>
      <OgContent
        image={image}
        login={login}
        title={title}
        topLanguages={topLanguages}
        topEcosystem={topEcosystem}
        rank={rank}
        rankPercentile={rankPercentile}
      />
      <OGActivityGraph data={data} rewards={rewardsCount} contribution={contributionCount} />
    </Wrapper>
  );
}
