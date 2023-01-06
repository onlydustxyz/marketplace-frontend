import { useIntl } from "src/hooks/useIntl";
import Table from "../Table";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import ContributorIcon from "src/assets/icons/Contributor";
import Dollar from "src/assets/icons/Dollar";
import CheckMark from "src/assets/icons/CheckMark";
import PullRequest from "src/assets/icons/PullRequest";
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
      <HeaderCell>
        <ContributorIcon className="p-px h-4 w-4" />
        <span>{T("contributor.table.contributor")}</span>
      </HeaderCell>
      <HeaderCell>
        <Dollar className="p-px h-4 w-4" />
        <span>{T("contributor.table.totalEarned")}</span>
      </HeaderCell>
      <HeaderCell>
        <CheckMark className="p-px h-4 w-4" />
        <span>{T("contributor.table.paidContributions")}</span>
      </HeaderCell>
      <HeaderCell>
        <PullRequest className="p-px h-4 w-4" />
        <span>{T("contributor.table.leftToPay")}</span>
      </HeaderCell>
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
