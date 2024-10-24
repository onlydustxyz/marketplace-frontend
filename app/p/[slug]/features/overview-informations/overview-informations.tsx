import { IMAGES } from "src/assets/img";
import MarkdownPreview from "src/components/MarkdownPreview";
import { withTooltip } from "src/components/Tooltip";
import LockFill from "src/icons/LockFill";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { Tags } from "./components/tags/tags";
import { TOverviewInformations } from "./overview-informations.types";

// TODO: Refacto MarkdownPreview
export function OverviewInformations({ project }: TOverviewInformations.Props) {
  const { T } = useIntl();
  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4 px-6 py-4">
        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" className="gap-1 md:gap-4">
            <img
              alt={project.name}
              src={project?.logoUrl || IMAGES.logo.space}
              loading="lazy"
              width={80}
              height={80}
              className="h-8 w-8 rounded-lg object-cover object-center md:h-20 md:w-20"
            />

            <Flex direction="col" className="flex-1 gap-1">
              <Typography variant="title-m">{project.name}</Typography>

              <Tags tags={project.tags} className="hidden lg:flex" />
            </Flex>

            <div className="flex justify-end">
              {project.visibility === "PRIVATE" && (
                <div
                  className="flex flex-row items-center gap-2 rounded-lg bg-orange-900 px-2.5 py-1 font-walsheim text-xs font-medium text-orange-500 hover:cursor-default"
                  {...withTooltip(T("project.visibility.private.tooltip"))}
                >
                  <LockFill /> {T("project.visibility.private.name")}
                </div>
              )}
            </div>
          </Flex>

          <Tags tags={project.tags} className="lg:hidden" />
        </Flex>

        <MarkdownPreview className="text-sm">{project.longDescription}</MarkdownPreview>
      </Flex>
    </Card>
  );
}
