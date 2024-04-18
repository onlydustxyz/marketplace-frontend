"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { Icon } from "components/layout/icon/icon";

import { TTrackAccordion } from "./track-accordion.types";

export function TrackAccordion({ children, icon, title, subtitle }: TTrackAccordion.Props) {
  return (
    <Accordion variant="splitted" className="!p-0">
      <AccordionItem key={title} aria-label={title} startContent={<Icon {...icon} />} subtitle={subtitle} title={title}>
        {children}
      </AccordionItem>
    </Accordion>
  );
}
