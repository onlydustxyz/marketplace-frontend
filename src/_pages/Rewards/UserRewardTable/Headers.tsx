import SortingArrow from "src/_pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import { SortField, Sorting } from "src/components/RewardTable/useQueryParamsSorting";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import FocusLine from "src/icons/FocusLine";
import FolderLine from "src/icons/FolderLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import TimeLine from "src/icons/TimeLine";

import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

export enum Fields {
  Date = "REQUESTED_AT",
  RewardId = "CONTRIBUTION",
  Amount = "AMOUNT",
  Status = "STATUS",
}

type Props = {
  sorting: Sorting<Fields>;
  sortField: SortField<Fields>;
  showContributor?: boolean;
};

export default function Headers({ sorting, sortField, showContributor }: Props) {
  const { T } = useIntl();
  return (
    <HeaderLine>
      <HeaderCell
        width={showContributor ? HeaderCellWidth.Eighth : undefined}
        onClick={() => sortField(Fields.Date)}
        horizontalMargin
      >
        <TimeLine className="p-px font-normal" />
        <span>{T("reward.table.date")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Date} />
      </HeaderCell>
      <HeaderCell
        width={showContributor ? HeaderCellWidth.Quarter : HeaderCellWidth.Third}
        onClick={() => sortField(Fields.RewardId)}
        horizontalMargin
      >
        <FolderLine className="p-px font-normal" />
        <span>{T("reward.table.project")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.RewardId} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.Amount)} horizontalMargin>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("reward.table.amount")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Amount} />
      </HeaderCell>
      {showContributor ? (
        <HeaderCell horizontalMargin>
          <Icon remixName={"ri-user-3-line"} className="p-px font-normal" />
          <span>{T("reward.table.contributor")}</span>
        </HeaderCell>
      ) : null}
      <HeaderCell onClick={() => sortField(Fields.Status)} horizontalMargin>
        <FocusLine className="p-px font-normal" />
        <span>{T("reward.table.status")}</span>
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Status} />
      </HeaderCell>
    </HeaderLine>
  );
}
