import { ProjectImageMetadata } from "components/features/seo/image-metadata/project/image-metadata.tsx";
import Generator from "components/features/seo/image-metadata/commons/generator/generator.tsx";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata.tsx";
import { ProjectsActions } from "../../../../actions_v1/Projects/projects.actions.ts";

export default async function Image(props: { params: { slug: string } }) {
  try {
    const project = await ProjectsActions.queries.retrieveBySlug(props.params.slug);
    return Generator({
      children: (
        <ProjectImageMetadata
          name={project?.name}
          description={project?.shortDescription}
          imageUrl={project?.logoUrl}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
