import { DropdownItem, DropdownMenu, DropdownTrigger, Dropdown as NextUIDropdown } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { Typography } from "components/layout/typography/typography";

import { TDropdown } from "./dropdown.types";

export function Dropdown({ children, items, MenuProps, ...rest }: TDropdown.Props) {
  return (
    <NextUIDropdown
      placement="bottom-end"
      {...rest}
      classNames={{
        base: "rounded-xl border border-card-border-light bg-greyscale-900 p-3",
        content: "p-0 shadow-none",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="w-fit">{children}</div>
      </DropdownTrigger>
      <DropdownMenu<TDropdown.Item>
        {...(MenuProps || {})}
        items={items}
        classNames={{
          base: "p-0 shadow-none",
        }}
      >
        {item => (
          <DropdownItem
            key={item.key}
            {...item}
            className={cn(
              "rounded-[6px] px-2 py-3 text-greyscale-50 data-[hover=true]:bg-card-background-medium data-[hover=true]:text-greyscale-50",
              {
                "text-orange-500 data-[hover=true]:text-orange-500": item.isWarning,
                "text-github-red data-[hover=true]:text-github-red": item.isError,
              },
              item.className
            )}
          >
            <Typography as="div" variant="body-s">
              {item.children}
            </Typography>
          </DropdownItem>
        )}
      </DropdownMenu>
    </NextUIDropdown>
  );
}
