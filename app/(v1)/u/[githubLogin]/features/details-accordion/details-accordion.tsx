"use client";

import { Accordion, AccordionItem, Selection } from "@nextui-org/react";
import { useState } from "react";

import { ContributionList } from "app/(v1)/u/[githubLogin]/components/contribution-list/contribution-list";
import { StartContent } from "app/(v1)/u/[githubLogin]/features/details-accordion/components/start-content";
import { TDetailsAccordion } from "app/(v1)/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

export function DetailsAccordion({ details, githubUserId }: TDetailsAccordion.AccordionProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <Accordion variant="splitted" className="!p-0" selectedKeys={selectedKeys}>
      {details?.map(detail => (
        <AccordionItem
          key={detail.name}
          className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-base !px-0 !shadow-none"
          indicator={({ isOpen }) => (
            <Icon
              remixName="ri-arrow-down-s-line"
              className={cn("transition-transform", { "rotate-180": isOpen })}
              size={24}
            />
          )}
          disableIndicatorAnimation
          classNames={{
            content: "!px-4 !py-4 !border-t-1 !border-card-border-light",
            trigger: "!px-4 justify-start items-start",
            startContent: "!flex-shrink",
            indicator: "text-snow",
          }}
          onClick={e => {
            if ((e.target as Element).className !== "child-project-avatar" && selectedKeys instanceof Set) {
              setSelectedKeys(selectedKeys.has(detail.name) ? new Set() : new Set([detail.name]));
            }
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
          <ContributionList
            githubUserId={githubUserId}
            languageId={detail.languageId ?? ""}
            ecosystemId={detail.ecosystemId ?? ""}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
