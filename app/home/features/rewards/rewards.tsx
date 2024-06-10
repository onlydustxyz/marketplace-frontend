"use client";

import { useMyRewardsTable } from "app/home/features/rewards/rewards.hooks";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Table } from "components/ds/table/table";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { TRewards } from "./rewards.types";

export function Rewards(_: TRewards.Props) {
  const { T } = useIntl();
  const { columns, rows, infiniteQuery, onRowAction } = useMyRewardsTable();

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
          <BaseLink href={NEXT_ROUTER.rewards.all} className="flex gap-1">
            <Typography
              className="text-spacePurple-500"
              translate={{ token: "v2.pages.home.rewards.seeAllRewards" }}
              variant="body-s-bold"
            />
            <Icon remixName="ri-arrow-right-s-line" className="text-spacePurple-500" size={16} />
          </BaseLink>
        }
        classNames={{
          section: "h-full",
          content: "h-full",
        }}
      >
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
              table: "h-full",
              tbody: "h-full",
              base: "h-full",
            }}
            TableBodyProps={{
              className: "h-full",
            }}
            TableRowProps={{
              className: "last:border-none cursor-pointer",
            }}
            TableCellProps={{
              className: "first:pl-6 last:pr-6",
            }}
          />
        </Card>
      </Section>
    </div>
  );
}
