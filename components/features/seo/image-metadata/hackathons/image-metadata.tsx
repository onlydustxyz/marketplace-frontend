import { GenericTextOnlyImageMetadata } from "components/features/seo/image-metadata/generic-text-only/image-metadata";

import { THackathonImageMetadataProps } from "./image-metadata.types";

export function HackathonImageMetadata({ name, dates, location }: THackathonImageMetadataProps.Props) {
  return <GenericTextOnlyImageMetadata title={name} subtitle={location} description={dates} />;
}
