import { useIntl } from "src/hooks/useIntl";
import { Currency, getPaymentStatusOrder, Payment, PaymentStatus } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import RoundedImage from "src/components/RoundedImage";
import { useEffect, useState } from "react";
import SortingArrow from "../ContributorsTable/SortingArrow";
import PayoutStatus from "../PayoutStatus";
import GithubPRLink, { LinkColor } from "./GithubPRLink";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import FocusLine from "src/icons/FocusLine";
import FolderLine from "src/icons/FolderLine";
import TimeLine from "src/icons/TimeLine";
import { formatMoneyAmount } from "src/utils/money";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

type PropsType = {
  payments: Payment[];
  payoutInfoMissing: boolean;
};

enum Field {
  Date,
  Contribution,
  Amount,
  Status,
}

type Sorting = {
  field: Field;
  ascending: boolean;
};

const ISSUE_NUMBER = /pull\/(\d+)$/;

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing }) => {
  const [sorting, setSorting] = useState({ field: Field.Date, ascending: false });
  const [sortedPayments, setSortedPayments] = useState(payments);

  useEffect(() => {
    const sorted = [...payments].sort((p1, p2) => {
      switch (sorting.field) {
        case Field.Date: {
          const requestedAt1 = new Date(p1.requestedAt);
          const requestedAt2 = new Date(p2.requestedAt);
          return requestedAt1.getTime() - requestedAt2.getTime();
        }
        case Field.Contribution: {
          const issueNumber1 = p1.reason.match(ISSUE_NUMBER) || ["", ""];
          const issueNumber2 = p2.reason.match(ISSUE_NUMBER) || ["", ""];
          return `${p1.project.title}${issueNumber1[1]}`.localeCompare(`${p2.project.title}${issueNumber2[1]}`);
        }
        case Field.Amount:
          return p1.amount.value - p2.amount.value;
        case Field.Status:
          return getPaymentStatusOrder(p1.status) - getPaymentStatusOrder(p2.status);
      }
    });
    setSortedPayments(sorting.ascending ? sorted : sorted.reverse());
  }, [sorting, payments]);

  const applySorting = (field: Field) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : true });

  return (
    <Table id="payment_table" headers={renderHeaders(sorting, applySorting)}>
      {renderPayments(sortedPayments, payoutInfoMissing)}
    </Table>
  );
};

const renderHeaders = (sorting: Sorting, applySorting: (field: Field) => void) => {
  const { T } = useIntl();
  return (
    <Headers>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Date)} horizontalMargin>
        <TimeLine className="p-px font-normal" />
        <span>{T("payment.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Half} onClick={() => applySorting(Field.Contribution)} horizontalMargin>
        <FolderLine className="p-px font-normal" />
        <span>{T("payment.table.contribution")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Contribution} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Sixth} onClick={() => applySorting(Field.Amount)} horizontalMargin>
        <MoneyDollarCircleLine className="p-px font-normal" />
        <span>{T("payment.table.amount")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => applySorting(Field.Status)} horizontalMargin>
        <FocusLine className="p-px font-normal" />
        <span>{T("payment.table.status")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} />
      </HeaderCell>
    </Headers>
  );
};

const renderPayments = (payments: Payment[], payoutInfoMissing: boolean) => {
  return payments.map(payment => (
    <Line key={payment.id} highlightOnHover={200}>
      <Cell> {dayjs.tz(payment.requestedAt, dayjs.tz.guess()).fromNow()} </Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment.project.logoUrl || onlyDustLogo} alt={payment.project.title} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment.project.title}</div>
          {payment.reason && <GithubPRLink link={payment.reason} linkColor={LinkColor.Grey}></GithubPRLink>}
        </div>
      </Cell>
      <Cell>{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</Cell>
      <Cell>
        <PayoutStatus {...{ status: payment.status, payoutInfoMissing }} />
      </Cell>
    </Line>
  ));
};

// TODO: replace this any with GraphQL-generated ts types
export const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const reason = apiPayment.reason?.work_items?.at(0);
  const requestedAt = apiPayment.requestedAt;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    requestedAt: requestedAt,
    amount,
    reason,
    project: {
      id: project.id,
      title: project.name,
      description: project.projectDetails.description,
      logoUrl: project.projectDetails.logoUrl || project.githubRepo?.content?.logoUrl,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export default PayoutTable;
