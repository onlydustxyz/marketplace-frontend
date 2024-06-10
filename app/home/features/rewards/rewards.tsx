"use client";

import { useMyRewardsTable } from "app/home/features/rewards/rewards.hooks";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Table } from "components/ds/table/table";
import { Section } from "components/layout/section/section";

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
              className: "px-4 py-6 last:border-none",
            }}
          />
        </Card>
      </Section>
    </div>
  );
}
