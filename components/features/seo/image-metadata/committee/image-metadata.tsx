import { TCommitteeImageMetadataProps } from "components/features/seo/image-metadata/committee/image-metadata.types";
import { GenericTextOnlyImageMetadata } from "components/features/seo/image-metadata/generic-text-only/image-metadata";

export function CommitteeImageMetadata({ name, dates }: TCommitteeImageMetadataProps.Props) {
  return <GenericTextOnlyImageMetadata title={name} description={dates} />;
}
