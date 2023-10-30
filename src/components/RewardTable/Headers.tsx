import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import TimeLine from "src/icons/TimeLine";
import Folder3Line from "src/icons/Folder3Line";
import FocusLine from "src/icons/FocusLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import Amount from "src/assets/icons/Amount";

export enum Fields {
  Date = "DATE",
  Contributor = "CONTRIBUTION",
  Amount = "AMOUNT",
  Status = "STATUS",
}

type SortingType = {
  field?: string;
  isAscending?: boolean;
};

type Props = {
  sorting: SortingType;
  sortField: (field: Fields) => void;
};

export default function Headers({ sorting, sortField }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell width={HeaderCellWidth.Quarter} horizontalMargin onClick={() => sortField(Fields.Date)}>
        <TimeLine className="pl-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Third} horizontalMargin onClick={() => sortField(Fields.Contributor)}>
        <Folder3Line className="pl-px font-normal" />
        <span>{T("reward.table.contributor")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Contributor} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => sortField(Fields.Amount)} horizontalMargin>
        <Amount className="pl-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Amount} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => sortField(Fields.Status)} horizontalMargin>
        <FocusLine className="pl-0.5 font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
