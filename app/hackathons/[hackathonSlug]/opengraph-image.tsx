import { bootstrap } from "core/bootstrap";

import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "components/features/seo/image-metadata/hackathons/image-metadata";

export default async function Image(props: { params: { hackathonSlug: string } }) {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
    const hackathon = await hackathonStorage
      .getHackathonBySlug({ pathParams: { hackathonSlug: props.params.hackathonSlug } })
      .request();

    return Generator({
      children: <HackathonImageMetadata hackathon={hackathon} />,
    });
  } catch (e) {
    console.error(e);

    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
