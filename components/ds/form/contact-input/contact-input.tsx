import { useFormContext } from "react-hook-form";

import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { Input } from "../input/input";
import { TContactInput } from "./contact-input.types";

export function ContactInput({ visibilityName, ...props }: TContactInput.Props) {
  const { setValue, watch } = useFormContext();

  const isVisible = watch(visibilityName);

  function handleClearClick() {
    if (!props.disabled && props.name) {
      setValue(props.name, "", { shouldDirty: true });
    }
  }

  function handleVisibleClick() {
    if (!props.disabled && visibilityName) {
      setValue(visibilityName, !isVisible, { shouldDirty: true });
    }
  }

  return (
    <Input
      {...props}
      classNames={{
        input: cn({
          "placeholder:text-greyscale-300": !props.value,
        }),
      }}
      startContent={
        <span
          className={cn({
            "text-greyscale-300": !props.value,
          })}
        >
          {props.startContent}
        </span>
      }
      endContent={
        props.value && !props.isInvalid ? (
          <Flex alignItems="center" className="gap-2">
            {isVisible ? (
              <Tooltip content={<Translate token="v2.commons.form.contact.tooltip.visible" />}>
                <Icon
                  remixName="ri-eye-line"
                  className={cn({
                    "text-spacePurple-200/50": props.disabled,
                    "cursor-pointer text-spacePurple-200": !props.disabled,
                  })}
                  onClick={handleVisibleClick}
                />
              </Tooltip>
            ) : (
              <Tooltip content={<Translate token="v2.commons.form.contact.tooltip.hidden" />}>
                <Icon
                  remixName="ri-eye-off-line"
                  className={cn("text-greyscale-100", {
                    "text-greyscale-600": props.disabled,
                    "cursor-pointer": !props.disabled,
                  })}
                  onClick={handleVisibleClick}
                />
              </Tooltip>
            )}

            <Icon
              remixName="ri-close-line"
              className={cn("text-greyscale-100", {
                "text-greyscale-600": props.disabled,
                "cursor-pointer": !props.disabled,
              })}
              onClick={handleClearClick}
            />
          </Flex>
        ) : null
      }
    />
  );
}
