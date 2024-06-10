"use client";

import Image from "next/image";
import { useMemo } from "react";

import { useMyRewardsTable } from "app/home/features/rewards/rewards.hooks";
import styles from "app/home/styles/styles.module.css";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
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

  const renderContent = useMemo(() => {
    if (!rows.length) {
      return (
        <Card
          className={cn(
            "flex h-full gap-4",
            "relative z-[1] w-full border-none bg-gradient-to-r from-[#422074] via-[#28115E] to-[#1C0E73]",
            "border-mask via-10% before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:h-full before:w-full before:rounded-2xl before:bg-gradient-to-r before:from-[#A390B3] before:via-[#8E7AA1] before:to-[#3B2A53]"
          )}
        >
          <div className="flex flex-1 flex-col gap-4">
            <Typography translate={{ token: "v2.pages.home.rewards.emptyState.title" }} variant="title-m" />
            <Typography translate={{ token: "v2.pages.home.rewards.emptyState.subtitle" }} variant="body-s-bold" />
            <Button size="s" as="a" href={NEXT_ROUTER.projects.all}>
              <Icon remixName="ri-sparkling-line" size={16} />
              <Typography translate={{ token: "v2.pages.home.rewards.emptyState.action" }} variant="body-s-bold" />
            </Button>
          </div>
          <Image src={IMAGES.global.payment} width={120} height={120} alt={T("emptyStatePictureFallback")} />
        </Card>
      );
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
            className: "first:pl-6 last:pr-6",
          }}
        />
      </Card>
    );
  }, [infiniteQuery, rows]);

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
          <BaseLink href={NEXT_ROUTER.rewards.all} className="flex gap-1 text-spacePurple-500">
            <Typography translate={{ token: "v2.pages.home.rewards.seeAllRewards" }} variant="body-s-bold" />
            <Icon remixName="ri-arrow-right-s-line" size={16} />
          </BaseLink>
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
