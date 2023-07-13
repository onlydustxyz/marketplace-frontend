import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import FocusLine from "src/icons/FocusLine";
import FolderLine from "src/icons/FolderLine";
import TimeLine from "src/icons/TimeLine";
import { Field, Sorting } from "src/hooks/useRewardSorting";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
};

export default function Headers({ sorting, applySorting }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Date, false)} horizontalMargin>
        <TimeLine className="p-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Third} onClick={() => applySorting(Field.RewardId, true)} horizontalMargin>
        <FolderLine className="p-px font-normal" />
        <span>{T("reward.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.RewardId} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Amount, false)} horizontalMargin>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => applySorting(Field.Status, true)} horizontalMargin>
        <FocusLine className="p-px font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
