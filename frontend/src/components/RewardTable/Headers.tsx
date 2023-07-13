import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import TimeLine from "src/icons/TimeLine";
import Folder3Line from "src/icons/Folder3Line";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import FocusLine from "src/icons/FocusLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import { Field, Sorting } from "src/hooks/useRewardSorting";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
};

export default function Headers({ sorting, applySorting }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell width={HeaderCellWidth.Quarter} horizontalMargin onClick={() => applySorting(Field.Date, false)}>
        <TimeLine className="pl-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Third} horizontalMargin onClick={() => applySorting(Field.RewardId, true)}>
        <Folder3Line className="pl-px font-normal" />
        <span>{T("reward.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.RewardId} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Amount, false)} horizontalMargin>
        <MoneyDollarCircleLine className="pl-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => applySorting(Field.Status, true)} horizontalMargin>
        <FocusLine className="pl-0.5 font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
