import { Accordion, AccordionItem } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { Badge } from "components/atoms/badge";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { AccordionPort } from "../../accordion.types";
import { AccordionNextUiVariants } from "./next-ui.variants";

export function AccordionNextUiAdapter({
  classNames,
  items,
  selectionMode,
  defaultSelected,
  startContent,
  showBadge,
}: AccordionPort) {
  const slots = AccordionNextUiVariants();

  return (
    <Accordion
      className={cn(slots.base(), classNames?.base)}
      selectionMode={selectionMode}
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
              <Typo {...item.titleProps} size="xs" weight="medium" />

              {showBadge ? (
                <Badge style="outline" size="s">
                  {item.content.length}
                </Badge>
              ) : null}
            </div>
          }
          indicator={<Icon remixName="ri-arrow-left-s-line" className="text-text-1" />}
          startContent={startContent}
        >
          {item.content.map((content, index) => (
            <div key={`${item.id}-content-${index}`}>{content}</div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
