"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { TLanguagesAccordion } from "app/migration/u/[githubLogin]/features/languages-accordion/languages-accordion.types";

import { Avatar } from "components/ds/avatar/avatar";
import { Icon } from "components/layout/icon/icon";

function StartContent() {
  return (
    <div className="flex gap-6">
      <div className="gap- flex flex-col gap-3">
        <Avatar
          src="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg"
          alt="language avatar"
          size="rectangleSize"
          shape="rectangle"
        />
      </div>
    </div>
  );
}

export function LanguagesAccordion(_: TLanguagesAccordion.Props) {
  const avatarUrl =
    "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg";
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
        startContent={
          <div className="flex">
            <Avatar src={avatarUrl} alt="language avatar" size="rectangleSize" shape="rectangle" />
          </div>
        }
        aria-label="Accordion 1"
        title="Accordion 1"
      >
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      </AccordionItem>
    </Accordion>
  );
}
