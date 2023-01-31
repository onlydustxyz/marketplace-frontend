import { useIntl } from "src/hooks/useIntl";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import CheckLine from "src/icons/CheckLine";
import { Field, Sorting } from "./View";

type Props = {
  sorting: Sorting;
  applySorting: (field: Field) => void;
  isProjectLeader: boolean;
};

export default function Headers({ sorting, applySorting, isProjectLeader }: Props) {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm">
      <HeaderCell onClick={() => applySorting(Field.Login)}>
        <User3Line className="text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned)}>
        <MoneyDollarCircleLine className="text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.totalEarned")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.PaidContributions)}>
        <CheckLine className="text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.paidContributions")}</span>
        <SortingArrow
          direction={sorting.ascending ? "up" : "down"}
          visible={sorting.field === Field.PaidContributions}
        />
      </HeaderCell>
      {isProjectLeader && <HeaderCell width={HeaderCellWidth.Quarter} />}
    </HeaderLine>
  );
}
