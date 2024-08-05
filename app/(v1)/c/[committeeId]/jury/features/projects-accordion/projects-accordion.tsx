import { Selection } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useState } from "react";

import { ProjectStatus } from "app/(v1)/c/[committeeId]/jury/components/project-status/project-status";
import { Project } from "app/(v1)/c/[committeeId]/jury/features/project/project";
import { TProjectAccordion } from "app/(v1)/c/[committeeId]/jury/features/projects-accordion/projects-accordion.types";

import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function ProjectsAccordion({ projectAssignments }: TProjectAccordion.Props) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <Accordion
      variant="splitted"
      className="!gap-4 !p-0 sm:!gap-8"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      selectionMode={"multiple"}
    >
      {projectAssignments.map(({ project, score }) => (
        <AccordionItem
          key={project.id}
          startContent={
            <Avatar src={project.logoUrl} alt={project.name} shape={"square"} size={"xl"} isBordered={false} />
          }
          aria-label={project.name}
          title={
            <Typography variant="body-m-bold" className={"truncate"}>
              {project.name}
            </Typography>
          }
          subtitle={
            project.shortDescription ? (
              <Typography variant="body-s" className="text-spaceBlue-200">
                {project.shortDescription}
              </Typography>
            ) : null
          }
          classNames={{
            base: "!rounded-2xl !border !border-card-border-medium !bg-card-background-base !px-0 !shadow-medium",
            trigger: "flex items-center px-2 sm:px-6 gap-3 bg-card-background-light",
            titleWrapper: "grid gap-1",
            title: "line-clamp-1",
            subtitle: "line-clamp-1",
            indicator: "text-greyscale-50",
            content: "px-1 py-3 sm:px-4 sm:py-6 border-t-1 border-card-border-light grid gap-4",
          }}
          indicator={({ isOpen }) => (
            <div className={"flex items-center gap-3"}>
              <ProjectStatus score={score} />
              <Icon
                remixName="ri-arrow-down-s-line"
                className={cn("transition-transform", { "rotate-180": isOpen })}
                size={24}
              />
            </div>
          )}
          disableIndicatorAnimation
        >
          <Project projectId={project.id} enabled={selectedKeys instanceof Set && selectedKeys.has(project.id)} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
