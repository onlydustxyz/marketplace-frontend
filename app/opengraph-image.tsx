import Generator from "components/features/seo/image-metadata/commons/generator/generator.tsx";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata.tsx";

export default async function Image() {
  return Generator({
    children: <GenericImageMetadata />,
  });
}
