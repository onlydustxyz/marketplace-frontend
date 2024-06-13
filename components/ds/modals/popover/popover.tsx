import { Popover as NextPopover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

import { TPopover } from "./popover.types";

export function Popover({ children, content, ...PopOverProps }: TPopover.Props) {
  return (
    <NextPopover
      classNames={{
        content: "rounded-2xl border border-greyscale-50/8 bg-greyscale-900 py-4 px-0",
      }}
      {...PopOverProps}
    >
      <PopoverTrigger {...PopOverProps}>
        <div className="relative inline-block">{children}</div>
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </NextPopover>
  );
}
