import { Input as NextInput } from "@nextui-org/react";
import { ReactNode } from "react";

import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Icon } from "components/layout/icon/icon";

import { TInput } from "./input.types";

export function Input({ className, radius, ...props }: TInput.Props) {
  return (
    <NextInput
      {...props}
      radius={radius ?? "sm"}
      className={cn("h-fit flex-col items-start gap-2", className)}
      classNames={{
        mainWrapper: "w-full",
        inputWrapper: cn(
          "rounded-lg border border-greyscale-50/8 bg-white/5 focus-within:!border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500 hover:border hover:border-greyscale-50/8 px-3 py-2 !transition-all",
          "group-data-[invalid=true]:!border-github-red-light group-data-[invalid=true]:focus-within:!border-spacePurple-500",
          { "cursor-not-allowed text-greyscale-600": props.disabled },
          {
            "min-h-8 h-8": !props.size,
          }
        ),
        innerWrapper: "gap-2",
        input: cn(
          "text-greyscale-50 group-data-[invalid=true]:!text-greyscale-50 focus:placeholder:text-spacePurple-200/60 placeholder:text-spaceBlue-200",
          props.classNames?.input,
          { "placeholder:text-greyscale-600": props.disabled }
        ),
        label:
          "!od-text-body-s-bold !p-0 pointer-events-auto text-greyscale-50 group-data-[invalid=true]:!text-greyscale-50 w-full",
        helperWrapper: "p-0 mt-2",
        description: "!od-text-body-xs text-greyscale-200 group-data-[invalid=true]:!text-greyscale-200",
      }}
      variant="bordered"
      labelPlacement="outside-left"
      label={
        props.label ? (
          <div className="flex w-full items-center justify-between">
            {props.label}
            {props.isInvalidFromBackend ? <Icon remixName="ri-error-warning-line" className="text-orange-500" /> : null}
          </div>
        ) : null
      }
      errorMessage={undefined}
      endContent={
        <>
          {props.isInvalid ? (
            <Tooltip content={props.errorMessage as ReactNode} placement="top-end">
              <Icon remixName="ri-close-circle-line" className="text-github-red-light" />
            </Tooltip>
          ) : null}

          {props.endContent}
        </>
      }
    />
  );
}
