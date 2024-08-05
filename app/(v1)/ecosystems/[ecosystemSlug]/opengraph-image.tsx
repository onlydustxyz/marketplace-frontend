import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericTextOnlyImageMetadata } from "components/features/seo/image-metadata/generic-text-only/image-metadata";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";

export default async function Image({ params }: { params: { ecosystemSlug: string } }) {
  try {
    const ecosystem = await ecosystemsApiClient.fetch.getEcosystemBySlug({ slug: params.ecosystemSlug }).request({
      next: { revalidate: 120 },
    });

    return Generator({
      children: <GenericTextOnlyImageMetadata title={ecosystem?.name} description={ecosystem.description} />,
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
