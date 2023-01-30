import { useIntl } from "src/hooks/useIntl";
import Table from "../Table";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import HeaderLine from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import Line from "../Table/Line";
import Cell, { CellHeight } from "../Table/Cell";
import { useContext, useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import SortingArrow from "./SortingArrow";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import User3Line from "src/icons/User3Line";
import CheckLine from "src/icons/CheckLine";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import Tooltip from "../Tooltip";
import { linkClickHandlerFactory } from "src/utils/clickHandler";
import Button, { ButtonSize, ButtonType } from "../Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import {
  PaymentAction,
  ProjectDetailsActionType,
  ProjectDetailsDispatchContext,
} from "src/pages/ProjectDetails/ProjectDetailsContext";
import { rates } from "src/hooks/useWorkEstimation";

type PropsType = {
  contributors: Contributor[];
  isProjectLeader: boolean;
  remainingBudget: number;
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

const ContributorsTable: React.FC<PropsType> = ({ contributors, isProjectLeader, remainingBudget }) => {
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
    <Table id="contributors_table" headers={renderHeaders(sorting, applySorting, isProjectLeader)}>
      {renderContributors(sortedContributors, isProjectLeader, remainingBudget)}
    </Table>
  );
};

const renderHeaders = (sorting: Sorting, applySorting: (field: Field) => void, isProjectLeader: boolean) => {
  const { T } = useIntl();

  return (
    <HeaderLine className="text-sm">
      <HeaderCell onClick={() => applySorting(Field.Login)}>
        <User3Line className="p-px text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.contributor")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Login} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.TotalEarned)}>
        <MoneyDollarCircleLine className="p-px text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.totalEarned")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.TotalEarned} />
      </HeaderCell>
      <HeaderCell onClick={() => applySorting(Field.PaidContributions)}>
        <CheckLine className="p-px  text-sm text-white" />
        <span className="text-spaceBlue-200 ">{T("contributor.table.paidContributions")}</span>
        <SortingArrow
          direction={sorting.ascending ? "up" : "down"}
          visible={sorting.field === Field.PaidContributions}
        />
      </HeaderCell>
      {isProjectLeader && <HeaderCell width={HeaderCellWidth.Quarter} />}
    </HeaderLine>
  );
};

const renderContributors = (contributors: Contributor[], isProjectLeader: boolean, remainingBudget: number) => {
  const { T } = useIntl();

  const dispatch = useContext(ProjectDetailsDispatchContext);

  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  return contributors.map(contributor => (
    <Line key={contributor.login} highlightOnHover={200}>
      <Cell className="space-x-3" height={CellHeight.Small}>
        <div
          onClick={linkClickHandlerFactory(`https://github.com/${contributor.login}`)}
          className="flex flex-row items-center gap-1"
        >
          <div>
            <RoundedImage src={contributor.avatarUrl} alt={contributor.login} size={ImageSize.ExtraSmall} />
          </div>
          <div className="flex space-x-1 items-end">
            <div>
              <span className="text-spacePurple-200">{contributor.login}</span>
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
          <ExternalLinkLine className="text-spacePurple-500 invisible group-hover/line:visible" />
        </div>
      </Cell>
      <Cell height={CellHeight.Small}>{`${contributor.totalEarned || "-"} $`}</Cell>
      <Cell height={CellHeight.Small}>{contributor.paidContributions || "-"}</Cell>
      {isProjectLeader && (
        <Cell height={CellHeight.Small}>
          <div
            onClick={() => {
              !isSendingNewPaymentDisabled &&
                dispatch({
                  type: ProjectDetailsActionType.SelectPaymentAction,
                  selectedPaymentAction: PaymentAction.Send,
                });
            }}
            className="group/sendPaymentButton relative"
          >
            <Button type={ButtonType.Secondary} size={ButtonSize.Small} disabled={isSendingNewPaymentDisabled}>
              <SendPlane2Line />
              <div>{T("project.details.contributors.sendPayment")}</div>
            </Button>
            <div className="invisible group-hover/sendPaymentButton:visible absolute z-10 w-fit">
              <Tooltip>{T("contributor.table.noBudgetLeft")}</Tooltip>
            </div>
          </div>
        </Cell>
      )}
    </Line>
  ));
};

export default ContributorsTable;
