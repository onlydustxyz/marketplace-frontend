import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { Input } from "../input/input";
import { TContactInput } from "./contact-input.types";

export function ContactInput({ isVisible, ...props }: TContactInput.Props) {
  function handleDeleteClick() {
    // if (!props.disabled) {
    //   setValue(name, "", { shouldDirty: true });
    // }
  }

  return (
    <Input
      {...props}
      endContent={
        <Flex alignItems="center" className="absolute right-3 gap-2">
          <Icon
            remixName="ri-close-line"
            className={cn({
              "text-greyscale-600": props.disabled,
              "cursor-pointer": !props.disabled,
            })}
            onClick={handleDeleteClick}
          />

          {isVisible ? (
            <Tooltip content={<Translate token="profile.form.contactInfo.visibleTootlip" />}>
              <Icon
                remixName="ri-eye-line"
                className={cn({
                  "text-spacePurple-200/50": props.disabled,
                  "cursor-pointer text-spacePurple-200": !props.disabled,
                })}
              />
            </Tooltip>
          ) : (
            <Tooltip content={<Translate token="profile.form.contactInfo.hiddenTootlip" />}>
              <Icon
                remixName="ri-eye-off-line"
                className={cn({
                  "text-greyscale-600": props.disabled,
                  "cursor-pointer": !props.disabled,
                })}
              />
            </Tooltip>
          )}
        </Flex>
      }
    />
  );
}
