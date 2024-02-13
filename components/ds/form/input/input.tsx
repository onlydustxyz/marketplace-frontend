import { Input as NextInput } from "@nextui-org/react";

import { TInput } from "./input.types";

export function Input(props: TInput.Props) {
  return (
    <NextInput
      className="h-fit flex-col items-start gap-2"
      classNames={{
        mainWrapper: "w-full",
        inputWrapper:
          "rounded-lg border border-greyscale-50/8 bg-white/5 focus-within:!border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500 hover:border hover:border-greyscale-50/8 h-8 min-h-8 px-3 py-2 transition-none",
        innerWrapper: "gap-2",
        input: "!p-0 !od-text-body-s",
        label: "!od-text-body-s-bold !p-0 pointer-events-auto",
        helperWrapper: "p-0 mt-2",
        description: "!od-text-body-xs text-greyscale-200",
      }}
      variant="bordered"
      labelPlacement="outside-left"
      {...props}
    />
  );
}
