import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import { pretty } from "src/utils/id";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { TRewardItem } from "components/features/stacks/payments-flow/request-payments-stacks/components/reward-item/reward-item.types";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/useCurrentUser/useCurrentUser";

export function RewardItem({
  id,
  currency,
  rewardedOnProjectLogoUrl,
  rewardedOnProjectName,
  numberOfRewardedContributions,
  onClick,
  type,
}: TRewardItem.Props) {
  const { user } = useCurrentUser();

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
                amount: currency.total,
                dollar: currency.dollarsEquivalent,
              }}
            />
            {user ? (
              <Flex justifyContent={"start"} alignItems="center" className="gap-1">
                <Avatar src={user.avatarUrl} alt={user.login} size="xs" />

                <Typography variant="body-xs" as="p">
                  <Translate
                    token="v2.pages.stacks.request_payments.item.to"
                    as="span"
                    className="text-greyscale-300"
                  />
                  &nbsp;
                  {user.login}
                </Typography>
              </Flex>
            ) : null}
            <Flex justifyContent={"start"} alignItems="center" className="gap-1">
              <Avatar src={rewardedOnProjectLogoUrl} alt={rewardedOnProjectName} size="xs" />

              <Typography variant="body-xs" as="p">
                <Translate token="v2.pages.stacks.request_payments.item.on" as="span" className="text-greyscale-300" />
                &nbsp;
                {rewardedOnProjectName}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
        <Button iconOnly onClick={onSelect} size="xs" variant="secondary">
          <Icon remixName={type === "exclude" ? "ri-subtract-line" : "ri-add-line"} />
        </Button>
      </Flex>
    </Card>
  );
}
