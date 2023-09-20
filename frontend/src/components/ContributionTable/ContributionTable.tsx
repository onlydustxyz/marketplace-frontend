import { ReactNode } from "react";

import { useIntl } from "src/hooks/useIntl";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import Table from "src/components/Table";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";

export default function ContributionTable({
  id,
  title,
  description,
  icon,
  onHeaderClick,
}: {
  id: string;
  title: string;
  description: string;
  icon(className: string): ReactNode;
  onHeaderClick: () => void;
}) {
  const { T } = useIntl();

  return (
    <section className="rounded-2xl border border-white/5">
      <header
        className="flex cursor-pointer items-start gap-3 border-b border-greyscale-50/8 bg-white/2 px-6 py-4"
        onClick={onHeaderClick}
      >
        <div className="rounded-lg bg-white/5 p-3 text-greyscale-50">{icon("h-5 w-5")}</div>
        <div className="font-walsheim">
          <p className="text-base font-medium text-greyscale-50">{title}</p>
          <p className="text-sm text-spaceBlue-200">{description}</p>
        </div>
      </header>
      <div className="px-4 py-6">
        <Table
          id={id}
          headers={
            <HeaderLine>
              <HeaderCell
                horizontalMargin
                // onClick={() => applySorting(Field.Date, false)}
              >
                {/* <TimeLine className="pl-px font-normal" /> */}
                <span>{T("contributions.table.date")}</span>
                {/* <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} /> */}
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Quarter}
                horizontalMargin
                // onClick={() => applySorting(Field.RewardId, true)}
              >
                {/* <Folder3Line className="pl-px font-normal" /> */}
                <span>{T("contributions.table.projectRepo")}</span>
                {/* <SortingArrow
                  direction={sorting.ascending ? "up" : "down"}
                  visible={sorting.field === Field.RewardId}
                /> */}
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Half}
                // onClick={() => applySorting(Field.Amount, false)}
                horizontalMargin
              >
                {/* <MoneyDollarCircleLine className="pl-px font-normal" /> */}
                <span>{T("contributions.table.contribution")}</span>
                {/* <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} /> */}
              </HeaderCell>
              <HeaderCell
                // onClick={() => applySorting(Field.Status, true)}
                horizontalMargin
                className="justify-end"
              >
                {/* <FocusLine className="pl-0.5 font-normal" /> */}
                <span>{T("contributions.table.comments")}</span>
                {/* <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} /> */}
              </HeaderCell>
            </HeaderLine>
          }
        >
          <Line
          //   onClick={onClick} selected={selected}
          >
            <Cell height={CellHeight.Medium}>Requested at</Cell>
            <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
              {/* <RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />
              <div className="flex flex-col justify-center truncate pb-0.5">
                <div className="font-walsheim text-sm font-medium text-greyscale-50">{recipient.login}</div>
                <div className="text-spaceBlue-200">
                  {T("reward.table.reward", {
                    id: pretty(reward.id),
                    count: reward.workItemsAggregate.aggregate?.count,
                  })}
                </div>
              </div> */}
              Login
            </Cell>
            <Cell height={CellHeight.Medium}>
              {/* <span className="font-walsheim">{formatMoneyAmount({ amount: reward.amountInUsd })}</span> */}
              Amount in usd
            </Cell>
            <Cell className="justify-end" height={CellHeight.Medium}>
              123
            </Cell>
          </Line>
        </Table>

        <p className="whitespace-pre-line pt-6 text-center font-walsheim text-sm text-greyscale-50">
          {T("contributions.table.empty", { time: "XX" })}
        </p>
      </div>
    </section>
  );
}
