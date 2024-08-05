import { committeeApiClient } from "api-client/resources/committees";
import { format } from "date-fns";

import { CommitteeImageMetadata } from "components/features/seo/image-metadata/committee/image-metadata";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";

export default async function Image(props: { params: { committeeId: string } }) {
  "use server";
  try {
    const committee = await committeeApiClient.fetch.getPublicCommittee(props.params.committeeId).request();
    return Generator({
      children: (
        <CommitteeImageMetadata
          name={committee?.name}
          dates={`${format(new Date(committee?.applicationStartDate), "dd/MM/yyyy")} - ${format(
            new Date(committee?.applicationEndDate),
            "dd/MM/yyyy"
          )}`}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
