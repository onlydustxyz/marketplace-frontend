import { Sorting } from "src/components/RewardTable/useQueryParamsSorting";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { useIntl } from "src/hooks/useIntl";
import FocusLine from "src/icons/FocusLine";
import FolderLine from "src/icons/FolderLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import TimeLine from "src/icons/TimeLine";
import { Fields } from "src/pages/Rewards";
import { Sorting } from "src/types";

type Props = {
  sorting: Sorting;
  sortField: (field: Fields) => void;
};

export default function Headers({ sorting, sortField }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell onClick={() => sortField(Fields.Date)} horizontalMargin>
        <TimeLine className="p-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Third} onClick={() => sortField(Fields.RewardId)} horizontalMargin>
        <FolderLine className="p-px font-normal" />
        <span>{T("reward.table.project")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.RewardId} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => sortField(Fields.Amount)} horizontalMargin>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Amount} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.Status)} horizontalMargin>
        <FocusLine className="p-px font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
