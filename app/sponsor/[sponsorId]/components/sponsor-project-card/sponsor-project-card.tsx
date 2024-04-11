import { useMediaQuery } from "usehooks-ts";
import { Money } from "utils/Money/Money";

import { TSponsorProjectCard } from "app/sponsor/[sponsorId]/components/sponsor-project-card/sponsor-project-card.types";
import { SponsorSidePanels } from "app/sponsor/[sponsorId]/components/sponsor-side-panels/sponsor-side-panels";

import { viewportConfig } from "src/config";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorProjectCard({ name, logoUrl, remainingBudgets }: TSponsorProjectCard.Props) {
  return (
    <Card background={"base"} className={"grid content-start gap-6"}>
      <header className={"flex items-center justify-between overflow-hidden"}>
        <Avatar.Labelled
          avatarProps={{ src: logoUrl, alt: name, size: "m", shape: "square" }}
          labelProps={{ title: name }}
          className={"flex-1"}
          truncate
        >
          <Typography variant={"body-xl-bold"} className={"truncate"}>
            {name}
          </Typography>
        </Avatar.Labelled>

        <SponsorSidePanels
          panel={"project"}
          buttonProps={{
            variant: "secondary",
            size: "s",
            className: "hidden lg:flex",
            children: (
              <>
                <Icon remixName={"ri-service-line"} />
                <Translate token={"v2.pages.sponsor.project.sponsorProject"} />
              </>
            ),
          }}
          projectParams={{
            // TODO @hayden add current project
            projectId: "123",
          }}
        />
      </header>

      <Card className={"grid gap-2 !p-3"} hasPadding={false}>
        <Typography variant={"body-s-bold"} className={"uppercase text-spaceBlue-200"}>
          <Translate token={"v2.pages.sponsor.project.totalBudget"} />
        </Typography>

        <Avatar.Labelled avatarProps={{ src: Money.USD.logoUrl, alt: Money.USD.name, size: "s" }}>
          <Typography variant={"body-l-bold"}>
            {
              // TODO @hayden get total USD amount
              Money.format({
                amount: 123123,
                currency: Money.USD,
                options: { currencyClassName: "od-text-body-m" },
              }).html
            }
          </Typography>
        </Avatar.Labelled>
      </Card>

      {remainingBudgets.length ? (
        <div className={"grid gap-2"}>
          <Typography variant={"body-s-bold"} className={"uppercase text-spaceBlue-200"}>
            <Translate token={"v2.pages.sponsor.project.perCurrency"} />
          </Typography>
          <ul className={"grid gap-2"}>
            {remainingBudgets.map(({ amount, currency, usdEquivalent }, i) => (
              <li key={`${amount}_${i}`} className={"flex items-center justify-between"}>
                <Avatar.Labelled avatarProps={{ src: currency.logoUrl, alt: currency.name, size: "xs" }}>
                  <Typography variant={"body-m"}>
                    {
                      Money.format({
                        amount,
                        currency,
                        options: { currencyClassName: "od-text-body-s" },
                      }).html
                    }
                  </Typography>
                </Avatar.Labelled>

                <Typography variant={"body-s-bold"} className={"text-spaceBlue-200"}>
                  {
                    Money.format({
                      amount: usdEquivalent,
                      currency: Money.USD,
                      options: { prefixAmountWithTilde: true },
                    }).string
                  }
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <SponsorSidePanels
        panel={"project"}
        buttonProps={{
          variant: "secondary",
          size: "s",
          className: "w-full lg:hidden",
          children: (
            <>
              <Icon remixName={"ri-service-line"} />
              <Translate token={"v2.pages.sponsor.project.sponsorProject"} />
            </>
          ),
        }}
        projectParams={{
          // TODO @hayden add current project
          projectId: "123",
        }}
      />
    </Card>
  );
}

SponsorProjectCard.Skeleton = function SponsorProjectCardSkeleton() {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  const height = isSm ? "256px" : "296px";
  return <SkeletonEl width="100%" height={height} variant="rounded" />;
};
