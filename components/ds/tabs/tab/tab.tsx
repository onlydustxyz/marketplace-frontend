import { Key } from "react";

import { cn } from "src/utils/cn";

import { tabVariants } from "components/ds/tabs/tab/tab.variants";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TTab } from "./tab.types";

export function Tab<T extends Key>({ content, icon, color }: TTab.Props<T>) {
  const slots = tabVariants({ color });
  return (
    <Flex justifyContent="start" alignItems="center" className="gap-1.5">
      {icon ? (
        <Icon
          {...icon}
          className={cn(
            "transition-colors",
            "duration-300 ease-in",
            "group-data-[hover-unselected=true]:text-greyscale-200",
            "group-data-[selected=true]:text-greyscale-50",
            slots.icon(),
            icon.className
          )}
        />
      ) : null}
      <Typography
        as={"div"}
        variant="body-m"
        className={cn(
          "transition-colors",
          "duration-300 ease-in",
          "group-data-[selected=true]:text-body-m-bold group-data-[selected=true]:text-greyscale-50",
          "group-data-[hover-unselected=true]:text-greyscale-200",
          slots.name()
        )}
      >
        {content}
      </Typography>
      <div
        className={cn(
          "transition-all",
          "duration-300 ease-in",
          "group-data-[hover-unselected=true]:-translate-y-0 group-data-[hover-unselected=true]:opacity-100",
          "absolute -bottom-2.5 left-0 right-0 h-1 translate-y-1 bg-greyscale-600 opacity-0",
          slots.hoverBorder()
        )}
      />
    </Flex>
  );
}
