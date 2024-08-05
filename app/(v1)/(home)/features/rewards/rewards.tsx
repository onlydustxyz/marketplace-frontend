"use client";

import { useMemo } from "react";

import { RewardsEmpty } from "app/(v1)/(home)/features/rewards/rewards.empty";
import { useMyRewardsTable } from "app/(v1)/(home)/features/rewards/rewards.hooks";
import { RewardsMobile } from "app/(v1)/(home)/features/rewards/rewards.mobile";
import styles from "app/(v1)/(home)/styles/styles.module.css";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Table } from "components/ds/table/table";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";
import { useIntl } from "hooks/translate/use-translate";

import { TRewards } from "./rewards.types";

export function Rewards(_: TRewards.Props) {
  const { T } = useIntl();
  const { columns, rows, infiniteQuery, onRowAction, rewards } = useMyRewardsTable();
  const isSm = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  const renderContent = useMemo(() => {
    if (!rows.length) {
      return <RewardsEmpty />;
    }

    if (!isSm) {
      return <RewardsMobile rewards={rewards} onClick={onRowAction} />;
    }

    return (
      <Card className="h-full" background={"base"} hasPadding={false}>
        <Table
          label={T("v2.pages.home.rewards.rewardsTable.title")}
          columns={columns}
          rows={rows}
          infiniteQuery={infiniteQuery}
          onRowAction={onRowAction}
          selectionMode="single"
          hideHeader
          classNames={{
            table: "max-h-full",
            tbody: "max-h-full",
            base: "max-h-full",
          }}
          TableBodyProps={{
            className: "h-full",
          }}
          TableRowProps={{
            className: "last:border-none cursor-pointer",
          }}
          TableCellProps={{
            className: "first:pl-3 last:pr-3",
          }}
        />
      </Card>
    );
  }, [infiniteQuery, rows, isSm]);

  return (
    <div className={cn("h-full w-full", styles.areaRewards)}>
      <Section
        iconProps={{ remixName: "ri-hand-coin-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.rewards.title",
          },
        }}
        rightContent={
          <>
            <BaseLink href={NEXT_ROUTER.rewards.all} className="hidden gap-1 text-spacePurple-500 sm:flex">
              <Typography translate={{ token: "v2.pages.home.rewards.seeAllRewards" }} variant="body-s-bold" />
              <Icon remixName="ri-arrow-right-s-line" size={16} />
            </BaseLink>
            <BaseLink
              href={NEXT_ROUTER.rewards.all}
              className={"block sm:hidden"}
              title={T("v2.pages.home.rewards.seeAllRewards")}
            >
              <Button variant={"secondary"} size={"s"} iconOnly>
                <Icon remixName={"ri-exchange-dollar-line"} />
              </Button>
            </BaseLink>
          </>
        }
        classNames={{
          section: "h-full",
          content: "h-full",
        }}
      >
        {renderContent}
      </Section>
    </div>
  );
}
