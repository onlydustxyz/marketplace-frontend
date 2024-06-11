import SortingArrow from "src/_pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import Amount from "src/assets/icons/Amount";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import FocusLine from "src/icons/FocusLine";
import Folder3Line from "src/icons/Folder3Line";
import TimeLine from "src/icons/TimeLine";

import { useIntl } from "hooks/translate/use-translate";

import { SortField, Sorting } from "./useQueryParamsSorting";

export enum Fields {
  Date = "REQUESTED_AT",
  Contributor = "CONTRIBUTION",
  Amount = "AMOUNT",
  Status = "STATUS",
}

type Props = {
  sorting: Sorting<Fields>;
  sortField: SortField<Fields>;
};

export default function Headers({ sorting, sortField }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell horizontalMargin onClick={() => sortField(Fields.Date)}>
        <TimeLine className="pl-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Third} horizontalMargin onClick={() => sortField(Fields.Contributor)}>
        <Folder3Line className="pl-px font-normal" />
        <span>{T("reward.table.contribution")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Contributor} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => sortField(Fields.Amount)} horizontalMargin>
        <Amount className="pl-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Amount} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.Status)} horizontalMargin>
        <FocusLine className="pl-0.5 font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
