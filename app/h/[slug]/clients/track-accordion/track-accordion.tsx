"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TTrackAccordion } from "./track-accordion.types";

export function TrackAccordion({ children, icon, title, subtitle }: TTrackAccordion.Props) {
  return (
    <>
      <Accordion variant="splitted" className="!p-0" defaultSelectedKeys="all">
        <AccordionItem
          key={title}
          className="!rounded-2xl !border-1 !border-card-border-light !bg-card-background-base !px-0 !shadow-none"
          aria-label={title}
          indicator={<Icon remixName="ri-arrow-down-s-line" />}
          startContent={
            <div className="flex h-12 w-12 flex-row items-center justify-center rounded-2xl border-4 border-card-border-medium bg-card-background-light">
              <Icon {...icon} />
            </div>
          }
          subtitle={
            <Typography variant="body-m" className="text-spaceBlue-200">
              {subtitle}
            </Typography>
          }
          title={<Typography variant="title-m">{title}</Typography>}
          classNames={{
            content: "!px-0 !py-2",
            trigger: "!px-6",
          }}
        >
          {children}
        </AccordionItem>
      </Accordion>
    </>
  );
}
