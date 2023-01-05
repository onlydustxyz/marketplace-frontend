import { useIntl } from "src/hooks/useIntl";
import Table from "../Table";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import Line from "../Table/Line";
import Cell from "../Table/Cell";

type PropsType = {
  contributors: Contributor[];
};

export type Contributor = {
  login: string;
  avatarUrl: string;
  isRegistered: boolean;
  totalEarned: number;
  paidContributions: number;
  contributionsLeftToPay: number;
};

const ContributorsTable: React.FC<PropsType> = ({ contributors }) => {
  return (
    <Table id="contributors_table" headers={renderHeaders()}>
      {renderContributors(contributors)}
    </Table>
  );
};

const renderHeaders = () => {
  const { T } = useIntl();

  return (
    <HeaderLine>
      <HeaderCell>{T("contributor.table.contributor")}</HeaderCell>
      <HeaderCell>{T("contributor.table.totalEarned")}</HeaderCell>
      <HeaderCell>{T("contributor.table.paidContributions")}</HeaderCell>
      <HeaderCell>{T("contributor.table.leftToPay")}</HeaderCell>
    </HeaderLine>
  );
};

const renderContributors = (contributors: Contributor[]) =>
  contributors.map(contributor => (
    <Line key={contributor.login}>
      <Cell>{contributor.login}</Cell>
      <Cell>{contributor.totalEarned}</Cell>
      <Cell>{contributor.paidContributions}</Cell>
      <Cell>{contributor.contributionsLeftToPay}</Cell>
    </Line>
  ));

export default ContributorsTable;
