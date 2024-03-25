import { format } from "date-fns";
import { useMemo } from "react";
import { Money } from "utils/Money/Money";

import { SponsorHistoryTransaction } from "app/sponsor/components/sponsor-history-transaction/sponsor-history-transaction";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function SponsorHistoryTable() {
  const { T } = useIntl();

  const hasNextPage = true;
  const fetchNextPage = () => {};
  const isFetchingNextPage = false;

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "date",
        label: T("v2.pages.sponsor.history.date"),
      },
      {
        key: "transaction",
        label: T("v2.pages.sponsor.history.transaction"),
      },
      {
        key: "amount",
        label: T("v2.pages.sponsor.history.amount"),
      },
      {
        key: "project",
        label: T("v2.pages.sponsor.history.project"),
      },
    ],
    []
  );

  const rows: TTable.Row[] = [
    {
      key: "123",
      date: format(new Date(), "MMMM dd yyyy, KK:mm a"),
      transaction: <SponsorHistoryTransaction type={"deposit"} />,
      amount: (
        <Flex className="gap-2" alignItems="center">
          <Chip solid className="h-5 w-5">
            <CurrencyIcons currency={Money.fromSchema({ code: "USD" })} className="h-5 w-5" />
          </Chip>
          <Typography variant={"body-s"}>
            {
              Money.format({
                amount: 123,
                currency: Money.fromSchema({ code: "USD" }),
                options: { currencyClassName: "text-body-xs" },
              }).html
            }
          </Typography>
        </Flex>
      ),
      project: <Avatar.Labelled avatarProps={{ src: "", shape: "square" }}>Madara</Avatar.Labelled>,
    },
  ];

  return (
    <Card background={"base"} className={"grid gap-5"}>
      <header>Filters</header>
      <Table
        label={T("v2.pages.sponsor.history.title")}
        columns={columns}
        rows={rows}
        bottomContent={
          hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} /> : null
        }
      />
    </Card>
  );
}
