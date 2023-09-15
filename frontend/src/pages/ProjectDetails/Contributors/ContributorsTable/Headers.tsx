import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell from "src/components/Table/HeaderCell";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import { Field, Sorting } from "./View";
import StackLine from "src/icons/StackLine";
import Medal2Fill from "src/icons/Medal2Fill";
import HandCoinLine from "src/icons/HandCoinLine";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
  isProjectLeader: boolean;
};

export default function Headers({ sorting, applySorting, isProjectLeader }: Props) {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm text-spaceBlue-200">
      <HeaderCell onClick={() => applySorting(Field.Login, true)}>
        <User3Line />
        {T("contributor.table.contributor")}
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.ContributionCount, false)}>
        <StackLine className="text-base" />
        {T("contributor.table.contributions")}
        <SortingArrow
          direction={sorting.ascending ? "up" : "down"}
          visible={sorting.field === Field.ContributionCount}
        />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.RewardCount, false)}>
        <Medal2Fill className="text-base" />
        {T("contributor.table.rewards")}
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.RewardCount} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned, false)}>
        <MoneyDollarCircleLine className="text-base" />
        {T("contributor.table.totalEarned")}
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      {isProjectLeader && (
        <HeaderCell onClick={() => applySorting(Field.ToRewardCount, false)}>
          <HandCoinLine className="text-base" />
          {T("contributor.table.toReward")}
          <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.ToRewardCount} />
        </HeaderCell>
      )}
    </HeaderLine>
  );
}
