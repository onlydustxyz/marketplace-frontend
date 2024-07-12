import { hackathonsApiClient } from "api-client/resources/hackathons";

import { hackathonShortenDate } from "components/features/hackathons/display-date/display-date.utils";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "components/features/seo/image-metadata/hackathons/image-metadata";

export default async function Image(props: { params: { slug: string } }) {
  try {
    // TODO @hayden refactor to use core
    const hackathon = await hackathonsApiClient.fetch.getHackathonBySlug(props.params.slug).request();
    return Generator({
      children: (
        <HackathonImageMetadata
          name={hackathon?.title}
          location="Worldwide"
          dates={hackathonShortenDate({ startDate: hackathon.startDate, endDate: hackathon.endDate })}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
