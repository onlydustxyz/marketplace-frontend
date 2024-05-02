import { hackathonsApiClient } from "api-client/resources/hackathons";

import { hackathonShortenDate } from "components/features/hackathons/display-date/display-date.utils";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "components/features/seo/image-metadata/hackathons/image-metadata";
import { PublicProfileImageMetadata } from "components/features/seo/image-metadata/public-profile/image-metadata";

export default async function Image(props: { params: { slug: string } }) {
  try {
    // const hackathon = await hackathonsApiClient.fetch.getHackathonBySlug(props.params.slug).request();
    return Generator({
      children: <PublicProfileImageMetadata name="title" location="Worldwide" dates="dates" />,
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
