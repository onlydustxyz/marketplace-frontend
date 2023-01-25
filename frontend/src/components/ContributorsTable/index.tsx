import { useIntl } from "src/hooks/useIntl";
import Table from "../Table";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import CheckLine from "src/icons/CheckLine";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import Tooltip from "../Tooltip";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

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
    const sorted = sortBy([...contributors], contributor => {
      const f = contributor[sorting.field];
      return typeof f === "string" ? f.toLocaleLowerCase() : f;
    });
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
        <User3Line className="p-px font-normal" />
        <span>{T("contributor.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned)}>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("contributor.table.totalEarned")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.PaidContributions)}>
        <CheckLine className="p-px font-normal" />
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
    <Line key={contributor.login} highlightOnHover={200}>
      <div onClick={linkClickHandlerFactory(`https://github.com/${contributor.login}`)} className="w-fit">
        <Cell className="space-x-3">
          <div>
            <RoundedImage src={contributor.avatarUrl} alt={contributor.login} size={ImageSize.ExtraSmall} />
          </div>
          <div className="flex space-x-1 items-end">
            <div>
              <span className="text-fuchsia-300">{contributor.login}</span>
            </div>
            {contributor.isRegistered && (
              <div className="relative group/od-logo">
                <img src={onlyDustLogo} className="h-3.5" />
                <div className="invisible group-hover/od-logo:visible absolute top-5 -left-16 w-36 z-10">
                  <Tooltip>{T("contributor.table.userRegisteredTooltip")}</Tooltip>
                </div>
              </div>
            )}
          </div>
          <ExternalLinkLine className="text-fuchsia-700 invisible group-hover/line:visible" />
        </Cell>
      </div>
      <Cell>{`${contributor.totalEarned || "-"} $`}</Cell>
      <Cell>{contributor.paidContributions || "-"}</Cell>
    </Line>
  ));
};

export default ContributorsTable;
