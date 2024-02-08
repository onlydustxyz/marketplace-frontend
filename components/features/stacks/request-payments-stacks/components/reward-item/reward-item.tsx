import { useCurrentUser } from "hooks/users/useCurrentUser";

import { AvailableConversion } from "src/components/Currency/AvailableConversion";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TRewardItem } from "./reward-item.types";

export function RewardItem({
  id,
  contributors,
  currency,
  rewardedOnProjectLogoUrl,
  rewardedOnProjectName,
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
        <Typography variant="title-s" as="p">
          <span>{id}</span>
          <span>·</span>
          <span>{contributors?.length}</span>
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
              <Thumbnail size={"xs"} src={user.avatarUrl} alt={user.login} />
              <Typography variant="body-xs" as="p">
                <Translate token="v2.pages.stacks.request_payments.item.to" as="span" />
                {user.login}
              </Typography>
            </Flex>
          ) : null}
          <Flex justifyContent={"start"} alignItems="center" className="gap-1">
            <Thumbnail size={"xs"} src={rewardedOnProjectLogoUrl} alt={rewardedOnProjectName} />
            <Typography variant="body-xs" as="p">
              <span>to</span>
              {user?.login}
            </Typography>
          </Flex>
        </Flex>
        <Button iconOnly onClick={onSelect} size="xs">
          <Icon remixName={type === "exclude" ? "ri-subtract-line" : "ri-add-line"} />
        </Button>
      </Flex>
    </Card>
  );
}
