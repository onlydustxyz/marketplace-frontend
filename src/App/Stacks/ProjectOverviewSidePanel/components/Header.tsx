import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import MarkdownPreview from "src/components/MarkdownPreview";
import PrivateTag from "src/components/PrivateTag";
import Tag, { TagSize } from "src/components/Tag";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";

export interface ProjectOverviewHeaderProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewHeader = ({ project }: ProjectOverviewHeaderProps) => {
  const languages = getTopTechnologies(project?.technologies || {});
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-card-border-light bg-greyscale-900 px-6 py-4 shadow-medium">
      <div className="flex flex-row items-center gap-4">
        <img
          alt={project.name || ""}
          src={project.logoUrl}
          className="h-20 w-20 flex-shrink-0 rounded-lg bg-spaceBlue-900 object-cover"
        />
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-row items-center justify-between font-belwe text-2xl font-normal text-greyscale-50">
            {project.name}
            {project.visibility === "PRIVATE" && <PrivateTag />}
          </div>
          {languages.length > 0 && (
            <Tag size={TagSize.Small}>
              <CodeSSlashLine />
              {buildLanguageString(languages)}
            </Tag>
          )}
        </div>
      </div>
      <MarkdownPreview className="text-sm">{project.longDescription}</MarkdownPreview>
    </div>
  );
};
