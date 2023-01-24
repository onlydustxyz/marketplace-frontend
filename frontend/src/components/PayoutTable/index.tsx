import { useIntl } from "src/hooks/useIntl";
import { Currency, Payment, PaymentStatus } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import RoundedImage from "src/components/RoundedImage";
import { useEffect, useState } from "react";
import { sortBy } from "lodash";
import SortingArrow from "../ContributorsTable/SortingArrow";
import PayoutStatus from "../PayoutStatus";

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

const REPO_NAME = /([^/]+)\/pull\/\d+$/;
const ISSUE_NUMBER = /\/(\d+)$/;

const PayoutTable: React.FC<PropsType> = ({ payments, payoutInfoMissing }) => {
  const [sorting, setSorting] = useState({ field: Field.Date, ascending: false });
  const [sortedPayments, setSortedPayments] = useState(payments);

  useEffect(() => {
    const sorted = sortBy([...payments], payment => {
      switch (sorting.field) {
        case Field.Date:
          return payment.requestedAt;
        case Field.Contribution: {
          const repoName = payment.reason.match(REPO_NAME);
          const issueNumber = payment.reason.match(ISSUE_NUMBER);
          return `${repoName}${issueNumber}`;
        }
        case Field.Amount:
          return payment.amount;
        case Field.Status:
          switch (payment.status) {
            case PaymentStatus.WAITING_PAYMENT:
              return 0;
            case PaymentStatus.ACCEPTED:
              return 1;
          }
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
      <HeaderCell className="w-1/4" onClick={() => applySorting(Field.Date)}>
        <span>{T("payment.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell className="w-1/2" onClick={() => applySorting(Field.Contribution)}>
        <span>{T("payment.table.project")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Contribution} />
      </HeaderCell>
      <HeaderCell className="w-1/4" onClick={() => applySorting(Field.Amount)}>
        <span>{T("payment.table.amount")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} />
      </HeaderCell>
      <HeaderCell className="w-1/4" onClick={() => applySorting(Field.Status)}>
        <span>{T("payment.table.status")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} />
      </HeaderCell>
    </Headers>
  );
};

const renderPayments = (payments: Payment[], payoutInfoMissing: boolean) => {
  return payments.map(payment => (
    <Line key={payment.id}>
      <Cell> {dayjs.tz(payment.requestedAt, dayjs.tz.guess()).fromNow()} </Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment.project.logoUrl || onlyDustLogo} alt={payment.project.title} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-bold text-xl">{payment.project.title}</div>
          {payment.reason && <div className="text-lg truncate">{payment.reason}</div>}
        </div>
      </Cell>
      <Cell>{`${payment.amount.value} ${payment.amount.currency}`}</Cell>
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
