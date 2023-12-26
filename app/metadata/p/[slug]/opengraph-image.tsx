import { ProjectImageMetadata } from "components/features/seo/image-metadata/project/image-metadata.tsx";
import Generator from "components/features/seo/image-metadata/commons/generator/generator.tsx";
import { API_PATH } from "../../../../src/api/ApiPath.ts";
import { GenericImageMetadata } from "../../../../components/features/seo/image-metadata/generic/image-metadata.tsx";
import { createFetchError, mapHttpStatusToString } from "../../../../src/api/query.utils.ts";
`https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}`;
export default async function Image(props: { params: { slug: string } }) {
  const project = await fetch(
    `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}${API_PATH.PROJECTS_BY_SLUG(props.params.slug)}`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw createFetchError(res, mapHttpStatusToString);
    })
    .catch(() => {
      console.log("errror");
    });

  if (!project) {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }

  // get request on project
  return Generator({
    children: (
      <ProjectImageMetadata name={project?.name} description={project?.shortDescription} imageUrl={project?.logoUrl} />
    ),
  });
}
