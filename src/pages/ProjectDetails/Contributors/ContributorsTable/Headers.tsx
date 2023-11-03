import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import StackLine from "src/icons/StackLine";
import Medal2Fill from "src/icons/Medal2Fill";
import HandCoinLine from "src/icons/HandCoinLine";
import { Fields } from "..";
import { Sorting } from "src/types";

type Props = {
  sorting: Sorting;
  sortField: (field: string) => void;
  isProjectLeader: boolean;
};

export default function Headers({ sorting, sortField, isProjectLeader }: Props) {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm text-spaceBlue-200">
      <HeaderCell onClick={() => sortField(Fields.Login)} width={HeaderCellWidth.Full}>
        <User3Line />
        {T("contributor.table.contributor")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.ContributionCount)} width={HeaderCellWidth.Full}>
        <StackLine className="text-base" />
        {T("contributor.table.contributions")}
        <SortingArrow
          direction={sorting.isAscending ? "up" : "down"}
          visible={sorting.field === Fields.ContributionCount}
        />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.RewardCount)} width={HeaderCellWidth.Full}>
        <Medal2Fill className="text-base" />
        {T("contributor.table.rewards")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.RewardCount} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.TotalEarned)} width={HeaderCellWidth.Full}>
        <MoneyDollarCircleLine className="text-base" />
        {T("contributor.table.totalEarned")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.TotalEarned} />
      </HeaderCell>
      {isProjectLeader && (
        <HeaderCell onClick={() => sortField(Fields.ToRewardCount)} width={HeaderCellWidth.Full}>
          <HandCoinLine className="text-base" />
          {T("contributor.table.toReward")}
          <SortingArrow
            direction={sorting.isAscending ? "up" : "down"}
            visible={sorting.field === Fields.ToRewardCount}
          />
        </HeaderCell>
      )}
    </HeaderLine>
  );
}
