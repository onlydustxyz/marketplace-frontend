"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { StartContent } from "app/migration/u/[githubLogin]/features/details-accordion/components/start-content";
import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { Icon } from "components/layout/icon/icon";

export function DetailsAccordion({ children, details }: TDetailsAccordion.AccordionProps) {
  return (
    <Accordion variant="splitted" className="!p-0">
      {details?.map(detail => (
        <AccordionItem
          key={detail.name}
          className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-base !px-0 !shadow-none"
          indicator={<Icon remixName="ri-arrow-down-s-line" size={24} />}
          classNames={{
            content: "!px-4 !py-4 !border-t-1 !border-card-border-light",
            trigger: "!px-4 justify-start items-start",
            startContent: "!flex-shrink",
            indicator: "text-snow",
          }}
          startContent={
            <StartContent
              avatarUrl={detail.avatarUrl}
              name={detail.name}
              projects={detail.projects}
              contributingStatus={detail.contributingStatus}
              projectsCount={detail.projectsCount}
              contributionCount={detail.contributionCount}
              rewardCount={detail.rewardCount}
              totalEarnedUsd={detail.totalEarnedUsd}
            />
          }
          aria-label={detail.name}
        >
          {children}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
