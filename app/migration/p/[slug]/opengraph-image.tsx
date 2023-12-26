import { ProjectImageMetadata } from "components/features/seo/image-metadata/project/image-metadata.tsx";
import Generator from "components/features/seo/image-metadata/commons/generator/generator.tsx";

export default async function Image(props: any) {
  console.log("coucou2222", props);
  // get request on project
  return Generator({
    children: (
      <ProjectImageMetadata
        name="coucou2"
        description={"coucou description"}
        imageUrl="https://avatars.githubusercontent.com/u/16590657"
      />
    ),
  });
}
