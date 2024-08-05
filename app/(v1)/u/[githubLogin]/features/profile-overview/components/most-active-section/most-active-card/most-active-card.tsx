import { Money } from "utils/Money/Money";

import { DotsStatus } from "app/(v1)/u/[githubLogin]/components/dots-status/dots-status";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TMostActiveCard } from "./most-active-card.types";

export function MostActiveCard({
  logoUrl,
  name,
  contributionCount,
  rewardCount,
  totalUsdEquivalent,
  status,
}: TMostActiveCard.Props) {
  return (
    <Card hasPadding={false}>
      <Flex direction="col" className="gap-4 px-3 py-4">
        <Flex alignItems="center" justifyContent="between" className="gap-2  max-[400px]:flex-wrap">
          <Flex alignItems="center" className="gap-2">
            {logoUrl ? <Avatar src={logoUrl} alt={name} size="s" isBordered={false} /> : null}

            <Typography variant="body-m-bold" className="line-clamp-1">
              {name}
            </Typography>
          </Flex>

          <DotsStatus status={status} />
        </Flex>

        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" className="flex-wrap gap-1">
            <Icon remixName="ri-stack-line" />

            <Flex className="gap-0.5">
              <Typography variant="body-s-bold">{contributionCount}</Typography>

              <Typography
                variant="body-xs"
                translate={{
                  token: "v2.pages.publicProfile.header.contributions",
                }}
                className="text-spaceBlue-100"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-medal-2-line" />

            <Flex className="gap-0.5">
              <Typography variant="body-s-bold">{rewardCount}</Typography>

              <Typography
                variant="body-xs"
                translate={{
                  token: "v2.pages.publicProfile.header.rewards",
                }}
                className="text-spaceBlue-100"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-hand-coin-line" />

            <Flex className="gap-0.5">
              <Typography variant="body-s-bold">
                {
                  Money.format({
                    amount: totalUsdEquivalent,
                    currency: Money.USD,
                    options: {
                      showCurrency: false,
                    },
                  }).string
                }
              </Typography>

              <Typography
                variant="body-xs"
                translate={{
                  token: "v2.pages.publicProfile.header.usd",
                }}
                className="text-spaceBlue-100"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
