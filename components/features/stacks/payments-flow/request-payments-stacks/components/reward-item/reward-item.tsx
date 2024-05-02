import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import { pretty } from "src/utils/id";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Checkbox } from "components/ds/checkbox/checkbox";
import { TRewardItem } from "components/features/stacks/payments-flow/request-payments-stacks/components/reward-item/reward-item.types";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RewardItem({
  id,
  currency,
  rewardedOnProjectLogoUrl,
  rewardedOnProjectName,
  numberOfRewardedContributions,
  onClick,
  type,
}: TRewardItem.Props) {
  function onSelect() {
    onClick(id);
  }
  return (
    <Card background={"light"} border={"light"}>
      <Flex justifyContent="between" alignItems="center" className="gap-3">
        <Flex justifyContent="start" alignItems="start" direction={"col"} className="gap-3">
          <Typography variant="title-s" as="p">
            <span>{`#${pretty(id)}`}</span>
            <span>&nbsp;·&nbsp;</span>
            <Translate
              token="v2.pages.stacks.request_payments.item.contributions"
              as="span"
              params={{ count: numberOfRewardedContributions }}
            />
          </Typography>
          <Flex justifyContent={"start"} alignItems="center" className="gap-3">
            <AvailableConversion
              currency={{
                currency: currency.currency,
                amount: currency.prettyAmount,
                dollar: currency.usdEquivalent,
              }}
            />
            <Flex justifyContent={"start"} alignItems="center" className="gap-1">
              <Avatar src={rewardedOnProjectLogoUrl} alt={rewardedOnProjectName} size="xs" shape={"square"} />
              <Typography variant="body-xs" as="p">
                <Translate token="v2.pages.stacks.request_payments.item.on" as="span" className="text-greyscale-300" />
                &nbsp;
                {rewardedOnProjectName}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
        <Checkbox onValueChange={onSelect} isSelected={type === "include"} />
      </Flex>
    </Card>
  );
}
