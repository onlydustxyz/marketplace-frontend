import { useIntl } from "src/hooks/useIntl";
import Table from "../Table";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import ContributorIcon from "src/assets/icons/Contributor";
import CheckMark from "src/assets/icons/CheckMark";
import ExternalLink from "src/assets/icons/ExternalLink";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import { useEffect, useState } from "react";
import _ from "lodash";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";

type PropsType = {
  contributors: Contributor[];
};

export type Contributor = {
  login: string;
  avatarUrl: string;
  isRegistered: boolean;
  totalEarned: number;
  paidContributions: number;
};

enum Field {
  Login = "login",
  TotalEarned = "totalEarned",
  PaidContributions = "paidContributions",
}

type Sorting = {
  field: Field;
  ascending: boolean;
};

const ContributorsTable: React.FC<PropsType> = ({ contributors }) => {
  const [sorting, setSorting] = useState({ field: Field.TotalEarned, ascending: false });
  const [sortedContributors, setSortedContributors] = useState(contributors);

  useEffect(() => {
    const sorted = _.sortBy([...contributors], sorting.field);
    setSortedContributors(sorting.ascending ? sorted : sorted.reverse());
  }, [sorting, contributors]);

  const applySorting = (field: Field) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : true });

  return (
    <Table id="contributors_table" headers={renderHeaders(sorting, applySorting)}>
      {renderContributors(sortedContributors)}
    </Table>
  );
};

const renderHeaders = (sorting: Sorting, applySorting: (field: Field) => void) => {
  const { T } = useIntl();

  return (
    <HeaderLine>
      <HeaderCell onClick={() => applySorting(Field.Login)}>
        <ContributorIcon className="p-px h-4 w-4" />
        <span>{T("contributor.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned)}>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("contributor.table.totalEarned")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.PaidContributions)}>
        <CheckMark className="p-px h-4 w-4" />
        <span>{T("contributor.table.paidContributions")}</span>
        <SortingArrow
          direction={sorting.ascending ? "up" : "down"}
          visible={sorting.field === Field.PaidContributions}
        />
      </HeaderCell>
    </HeaderLine>
  );
};

const renderContributors = (contributors: Contributor[]) => {
  const { T } = useIntl();

  return contributors.map(contributor => (
    <Line key={contributor.login} link={`https://github.com/${contributor.login}`}>
      <Cell className="space-x-3">
        <div>
          <img src={contributor.avatarUrl} className="h-6 rounded-xl border border-gray-100/20" />
        </div>
        <div className="flex space-x-1 items-end">
          <div>
            <span className="text-fuchsia-300">{contributor.login}</span>
          </div>
          {contributor.isRegistered && (
            <div className="relative group/od-logo">
              <img src={onlyDustLogo} className="h-3.5" />
              <div className="invisible group-hover/od-logo:visible absolute top-6 -left-16 bg-chineseBlack">
                <div className="bg-white/10 font-normal rounded-lg py-3 px-2 w-36 text-center">
                  {T("contributor.table.userRegisteredTooltip")}
                </div>
              </div>
            </div>
          )}
        </div>
        <ExternalLink className="h-3 fill-fuchsia-700 invisible group-hover/line:visible" />
      </Cell>
      <Cell>{`${contributor.totalEarned || "-"} $`}</Cell>
      <Cell>{contributor.paidContributions || "-"}</Cell>
    </Line>
  ));
};

export default ContributorsTable;
