import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import CheckLine from "src/icons/CheckLine";
import { Field, Sorting } from "./View";
import GitMergeLine from "src/icons/GitMergeLine";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field) => void;
  isProjectLeader: boolean;
};

export default function Headers({ sorting, applySorting, isProjectLeader }: Props) {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm text-spaceBlue-200">
      <HeaderCell onClick={() => applySorting(Field.Login)}>
        <User3Line />
        {T("contributor.table.contributor")}
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned)}>
        <MoneyDollarCircleLine />
        {T("contributor.table.totalEarned")}
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.PaidContributions)}>
        <CheckLine />
        {T("contributor.table.paidContributions")}
        <SortingArrow
          direction={sorting.ascending ? "up" : "down"}
          visible={sorting.field === Field.PaidContributions}
        />
      </HeaderCell>
      {isProjectLeader && (
        <>
          <HeaderCell onClick={() => applySorting(Field.LeftToPay)}>
            <GitMergeLine />
            {T("contributor.table.leftToPay")}
            <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.LeftToPay} />
          </HeaderCell>
          <HeaderCell width={HeaderCellWidth.Fifth} />
        </>
      )}
    </HeaderLine>
  );
}
