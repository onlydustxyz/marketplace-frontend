import { SortField, Sorting } from "src/components/RewardTable/useQueryParamsSorting";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import HandCoinLine from "src/icons/HandCoinLine";
import Medal2Fill from "src/icons/Medal2Fill";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import StackLine from "src/icons/StackLine";
import User3Line from "src/icons/User3Line";

import { useIntl } from "hooks/translate/use-translate";

import SortingArrow from "./SortingArrow";

export enum Fields {
  ContributionCount = "CONTRIBUTION_COUNT",
  TotalEarned = "EARNED",
  Login = "LOGIN",
  RewardCount = "REWARD_COUNT",
  ToRewardCount = "TO_REWARD_COUNT",
}

type Props = {
  sorting: Sorting<Fields>;
  sortField: SortField<Fields>;
  isProjectLeader: boolean;
};

export default function Headers({ sorting, sortField, isProjectLeader }: Props) {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm text-spaceBlue-200">
      <HeaderCell onClick={() => sortField(Fields.Login)} width={HeaderCellWidth.Fifth}>
        <User3Line />
        {T("contributor.table.contributor")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.ContributionCount)} width={HeaderCellWidth.Sixth}>
        <StackLine className="text-base" />
        {T("contributor.table.contributions")}
        <SortingArrow
          direction={sorting.isAscending ? "up" : "down"}
          visible={sorting.field === Fields.ContributionCount}
        />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.RewardCount)} width={HeaderCellWidth.Sixth}>
        <Medal2Fill className="text-base" />
        {T("contributor.table.rewards")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.RewardCount} />
      </HeaderCell>
      <HeaderCell onClick={() => sortField(Fields.TotalEarned)} width={HeaderCellWidth.Fifth}>
        <MoneyDollarCircleLine className="text-base" />
        {T("contributor.table.totalEarned")}
        <SortingArrow direction={sorting.isAscending ? "up" : "down"} visible={sorting.field === Fields.TotalEarned} />
      </HeaderCell>
      {isProjectLeader && (
        <>
          <HeaderCell onClick={() => sortField(Fields.ToRewardCount)} width={HeaderCellWidth.Sixth}>
            <HandCoinLine className="text-base" />
            {T("contributor.table.toReward")}
            <SortingArrow
              direction={sorting.isAscending ? "up" : "down"}
              visible={sorting.field === Fields.ToRewardCount}
            />
          </HeaderCell>
          <HeaderCell width={HeaderCellWidth.Fifth}></HeaderCell>
        </>
      )}
    </HeaderLine>
  );
}
