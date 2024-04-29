"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { TLanguagesAccordion } from "app/migration/u/[githubLogin]/features/languages-accordion/languages-accordion.types";

import { Icon } from "components/layout/icon/icon";

export function LanguagesAccordion(_: TLanguagesAccordion.Props) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <Accordion variant="splitted" className="!p-0">
      <AccordionItem
        key="1"
        className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-base !px-0 !shadow-none"
        indicator={<Icon remixName="ri-arrow-down-s-line" />}
        classNames={{
          content: "!px-6 !py-4 !border-t-1 !border-card-border-light",
          trigger: "!px-6",
        }}
        aria-label="Accordion 1"
        title="Accordion 1"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
