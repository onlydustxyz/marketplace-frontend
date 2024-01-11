import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";

export default async function Image() {
  return Generator({
    children: <GenericImageMetadata />,
  });
}
