import { mock } from "app/h/[slug]/mock";

import { hackathonShortenDate } from "components/features/hackathons/display-date/display-date.utils";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "components/features/seo/image-metadata/hackathons/image-metadata";

export default async function Image(props: { params: { slug: string } }) {
  try {
    const hackathon = mock;
    if (mock.slug !== props.params.slug) throw new Error("Not found");

    return Generator({
      children: (
        <HackathonImageMetadata
          name={hackathon?.title}
          location="Worlwide"
          dates={hackathonShortenDate({ startDate: mock.startDate, endDate: mock.endDate })}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
