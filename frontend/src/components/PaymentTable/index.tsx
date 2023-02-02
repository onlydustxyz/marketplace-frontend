import { useIntl } from "src/hooks/useIntl";
import { PaymentWithRecipientInfo } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import TimeLine from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import GithubPRLink, { LinkColor } from "../PayoutTable/GithubPRLink";
import Folder3Line from "src/icons/Folder3Line";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import FocusLine from "src/icons/FocusLine";
import isPayoutInfoMissing from "src/utils/isPayoutInfoMissing";
import usePaymentSorting, { Field, Sorting } from "src/hooks/usePaymentSorting";
import SortingArrow from "../ContributorsTable/SortingArrow";

type PropsType = {
  payments: PaymentWithRecipientInfo[];
};

const PaymentTable: React.FC<PropsType> = ({ payments }) => {
  const { sortedPayments, sorting, applySorting } = usePaymentSorting(payments);

  return (
    <Table id="payment_table" headers={renderHeaders(sorting, applySorting)}>
      {renderPayments(sortedPayments)}
    </Table>
  );
};

const renderHeaders = (sorting: Sorting, applySorting: (field: Field) => void) => {
  const { T } = useIntl();
  return (
    <Headers>
      <HeaderCell width={HeaderCellWidth.Sixth} horizontalMargin onClick={() => applySorting(Field.Date)}>
        <TimeLine className="pl-px font-normal" />
        <span>{T("payment.table.date")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Date} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Half} horizontalMargin onClick={() => applySorting(Field.Contribution)}>
        <Folder3Line className="pl-px font-normal" />
        <span>{T("payment.table.contribution")}</span>
        <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Contribution} />
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} onClick={() => applySorting(Field.Amount)} horizontalMargin>
        <MoneyDollarCircleLine className="pl-px font-normal" />
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

const renderPayments = (payments: PaymentWithRecipientInfo[]) => {
  return payments.map(payment => {
    const payoutInfoMissing = !!isPayoutInfoMissing(payment.recipientPayoutSettings);
    return (
      <>
        {payment && payment.recipient && (
          <Line key={payment.id} highlightOnHover={200}>
            <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
            <Cell className="flex flex-row gap-3">
              <RoundedImage
                src={payment.recipient.avatarUrl}
                alt={payment.recipient.login}
                rounding={Rounding.Circle}
              />
              <div className="flex flex-col truncate justify-center pb-0.5">
                <div className="font-medium text-sm text-greyscale-50 font-walsheim">{payment.recipient.login}</div>
                {payment.reason && <GithubPRLink link={payment.reason} linkColor={LinkColor.Grey}></GithubPRLink>}
              </div>
            </Cell>
            <Cell>
              <span className="font-walsheim">{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</span>
            </Cell>
            <Cell>
              <PayoutStatus {...{ status: payment.status, payoutInfoMissing }} isProjectLeaderView />
            </Cell>
          </Line>
        )}
      </>
    );
  });
};

export default PaymentTable;
