import { Accordion, AccordionItem } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { AccordionPort } from "../../accordion.types";
import { AccordionNextUiVariants } from "./next-ui.variants";

export function AccordionNextUiAdapter({ classNames, items, multiple = false, defaultSelected }: AccordionPort) {
  const slots = AccordionNextUiVariants();

  return (
    <Accordion
      className={cn(slots.base(), classNames?.base)}
      selectionMode={multiple ? "multiple" : "single"}
      showDivider={false}
      defaultSelectedKeys={defaultSelected}
    >
      {items.map(item => (
        <AccordionItem
          key={item.id}
          classNames={{
            heading: cn(slots.heading(), classNames?.heading),
            trigger: cn(slots.trigger(), classNames?.trigger),
            content: cn(slots.content(), classNames?.content),
          }}
          title={
            <div className="flex items-center gap-2">
              {item.startContent}

              <Typo {...item.titleProps} size="xs" weight="medium" />

              {item.endContent}
            </div>
          }
          indicator={<Icon remixName="ri-arrow-left-s-line" className="text-text-1" />}
        >
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
