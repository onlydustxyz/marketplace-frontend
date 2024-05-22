import { Accordion, AccordionItem } from "@nextui-org/react";

import { ProjectStatus } from "app/c/[committeeId]/jury/components/project-status/project-status";
import { ProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote";
import { TProjectAccordion } from "app/c/[committeeId]/jury/features/projects-accordion/projects-accordion.types";

import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function ProjectsAccordion({ projects }: TProjectAccordion.Props) {
  return (
    <Accordion variant="splitted" className="!p-0">
      {projects?.map(p => (
        <AccordionItem
          key={p.id}
          startContent={<Avatar src={p.logoUrl} alt={p.name} shape={"square"} size={"xl"} isBordered={false} />}
          aria-label={p.name}
          title={<Typography variant="body-m-bold">{p.name}</Typography>}
          subtitle={
            <Typography variant="body-s" className="text-spaceBlue-200">
              {p.description}
            </Typography>
          }
          classNames={{
            base: "!rounded-2xl !border !border-card-border-medium !bg-card-background-base !px-0 !shadow-medium",
            trigger: "flex items-center px-6 gap-3 bg-card-background-light",
            titleWrapper: "grid gap-1",
            title: "line-clamp-1",
            subtitle: "line-clamp-1",
            indicator: "text-greyscale-50",
            content: "px-4 py-6 border-t-1 border-card-border-light grid gap-4",
          }}
          indicator={({ isOpen }) => (
            <div className={"flex items-center gap-3"}>
              {/* TODO */}
              <ProjectStatus score={1.23} />
              <Icon
                remixName="ri-arrow-down-s-line"
                className={cn("transition-transform", { "rotate-180": isOpen })}
                size={24}
              />
            </div>
          )}
          disableIndicatorAnimation
        >
          <div>project</div>
          <div>questions</div>

          <ProjectVote
            criteria={[
              {
                message: "Criteria 1",
                score: 1,
              },
              {
                message:
                  "Criteria 2 hqsdfh qsdklfhqs klfqshfkl qshfkqs fqsklhf klsdhf qsklfhql kjhqsdfkqhsfklqs fklqs kflqsh fkjlqsdhfkqshfkqsjh fkqsh fqsfklqsh fkjlqsh dhkqsdh fkjqsdhfk qsd",
                score: 3,
              },
            ]}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
