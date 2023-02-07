import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import SortingArrow from "../ContributorsTable/SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import FocusLine from "src/icons/FocusLine";
import FolderLine from "src/icons/FolderLine";
import TimeLine from "src/icons/TimeLine";
import { Field, Sorting } from "src/hooks/usePaymentSorting";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field) => void;
};

export default function Headers({ sorting, applySorting }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Date)} horizontalMargin>
        <TimeLine className="p-px font-normal" />
        <span>{T("payment.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Half} onClick={() => applySorting(Field.Contribution)} horizontalMargin>
        <FolderLine className="p-px font-normal" />
        <span>{T("payment.table.contribution")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Contribution} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Amount)} horizontalMargin>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("payment.table.amount")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => applySorting(Field.Status)} horizontalMargin>
        <FocusLine className="p-px font-normal" />
        <span>{T("payment.table.status")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
