import { Checkbox } from "@nextui-org/react";

import { Chip } from "src/components/Chip/Chip";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { TSelectableBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/selectable-billing-profile/selectable-billing-profile.types";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SelectableBillingProfile({
  title,
  count,
  icon,
  selected,
  onChange,
  value,
  disabled,
}: TSelectableBillingProfile.Props) {
  function onClick() {
    onChange(value);
  }
  return (
    <Card
      background={false}
      border={selected ? "heavy" : "light"}
      className={cn("p-4", { "cursor-not-allowed": disabled })}
      onClick={!disabled ? onClick : undefined}
    >
      <Flex justifyContent="between" alignItems="center" className="gap-1">
        <Flex justifyContent="start" alignItems="center" className="gap-4">
          <Chip className="h-8 w-8">
            <Icon {...icon} className={cn("h-4 w-4", icon.className, { "text-greyscale-500": disabled })} />
          </Chip>
          <div>
            <Typography
              variant={"title-s"}
              className={cn("mb-0.5 capitalize text-greyscale-50", { "text-greyscale-500": disabled })}
            >
              {title}
            </Typography>
            <Typography variant={"body-s"} className={cn("text-spacePurple-500", { "text-greyscale-500": disabled })}>
              <Translate
                token="v2.pages.stacks.request_payments.selectBillingProfile.rewardsCount"
                params={{ count }}
              />
            </Typography>
          </div>
        </Flex>
        {!disabled ? (
          <Checkbox
            radius="full"
            isSelected={selected}
            className="pointer-events-none"
            classNames={{
              wrapper: "after:bg-spacePurple-500",
            }}
            disabled={disabled}
          />
        ) : null}
      </Flex>
    </Card>
  );
}
