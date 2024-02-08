import { Textarea as NextTextarea } from "@nextui-org/react";
import { ReactNode } from "react";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTextarea } from "./textarea.types";

function InputLabel(label: ReactNode) {
  if (!label) return null;

  if (typeof label === "string") {
    return (
      <Typography variant="body-s-bold" as="label">
        {label}
      </Typography>
    );
  } else {
    return label;
  }
}

function InputDescription(description: ReactNode) {
  if (!description) return null;

  if (typeof description === "string") {
    return (
      <Typography variant="body-xs" className="text-greyscale-200">
        {description}
      </Typography>
    );
  } else {
    return description;
  }
}

export function Textarea({ label, description, ...props }: TTextarea.Props) {
  return (
    <Flex direction="col" className="flex-1 gap-2">
      {InputLabel(label)}

      <NextTextarea
        classNames={{
          inputWrapper:
            "rounded-lg border border-greyscale-50/8 bg-white/5 focus-within:!border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500 hover:border hover:border-greyscale-50/8 h-8 min-h-8 px-3 py-2 transition-none",
          innerWrapper: "gap-2",
          input: "!p-0 font-walsheim text-sm leading-none",
        }}
        variant="bordered"
        labelPlacement="outside"
        {...props}
      />

      {InputDescription(description)}
    </Flex>
  );
}
