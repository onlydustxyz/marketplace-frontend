import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import MarkdownPreview from "src/components/MarkdownPreview";
import Tag, { TagSize } from "src/components/Tag";
import config from "src/config";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { withTooltip } from "src/components/Tooltip";
import LockFill from "src/icons/LockFill";
import { useIntl } from "src/hooks/useIntl";

export interface ProjectOverviewHeaderProps {
  project: UseGetProjectBySlugResponse;
}

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur *adipiscing elit*. Sed non risus. **Suspendisse lectus** tortor, dignissim sit amet:
- adipiscing nec
- ultricies sed
- dolor.

Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
`;

export const ProjectOverviewHeader = ({ project }: ProjectOverviewHeaderProps) => {
  const languages = getTopTechnologies(project?.technologies || {});
  const logoUrl = project?.logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + project.logoUrl : onlyDustLogo;
  const { T } = useIntl();

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <img
          alt={project.name || ""}
          src={logoUrl}
          className="h-20 w-20 flex-shrink-0 rounded-lg bg-spaceBlue-900 object-cover"
        />
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-row items-center justify-between font-belwe text-2xl font-normal text-greyscale-50">
            {project.name}
            {project.visibility === "PRIVATE" && (
              <div
                className="flex flex-row items-center gap-2 rounded-lg bg-orange-900 px-2.5 py-1 font-walsheim text-xs font-medium text-orange-500 hover:cursor-default"
                {...withTooltip(T("project.visibility.private.tooltip"))}
              >
                <LockFill /> {T("project.visibility.private.name")}
              </div>
            )}
          </div>
          {languages.length > 0 && (
            <Tag size={TagSize.Small}>
              <CodeSSlashLine />
              {buildLanguageString(languages)}
            </Tag>
          )}
        </div>
      </div>
      <MarkdownPreview className="text-sm">{project.longDescription || LOREM_IPSUM}</MarkdownPreview>
    </>
  );
};
