"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { ContributionList } from "app/migration/u/[githubLogin]/components/contribution-list/contribution-list";
import { StartContent } from "app/migration/u/[githubLogin]/features/details-accordion/components/start-content";
import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { Icon } from "components/layout/icon/icon";

export function DetailsAccordion({ details }: TDetailsAccordion.AccordionProps) {
  return (
    <Accordion variant="splitted" className="!p-0">
      {details?.map(detail => (
        <AccordionItem
          key={detail.name}
          className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-base !px-0 !shadow-none"
          indicator={<Icon remixName="ri-arrow-down-s-line" />}
          classNames={{
            content: "!px-4 !py-4 !border-t-1 !border-card-border-light",
            trigger: "!px-4",
            startContent: "!flex-shrink",
          }}
          startContent={
            <StartContent
              avatarUrl={detail.avatarUrl}
              name={detail.name}
              projects={detail.projects}
              rankStatus={detail.rankStatus}
              projectsCount={detail.projectsCount}
              contributionCount={detail.contributionCount}
              rewardsCount={detail.rewardsCount}
              earnedUsdAmount={detail.earnedUsdAmount}
            />
          }
          aria-label={detail.name}
        >
          <ContributionList />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
