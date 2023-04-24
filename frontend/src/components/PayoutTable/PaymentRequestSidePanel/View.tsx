import { PropsWithChildren, useState } from "react";
import GithubIssue from "src/components/GithubIssue";
import PayoutStatus from "src/components/PayoutStatus";
import QueryWrapper from "src/components/QueryWrapper";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";
import { formatMoneyAmount } from "src/utils/money";
import { PaymentRequestDetailsFragment } from "src/__generated/graphql";
import Button, { ButtonSize } from "src/components/Button";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import ConfirmationModal from "./ConfirmationModal";
import classNames from "classnames";

export type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  loading: boolean;
  status: PaymentStatus;
  userId?: string;
  githubUserId?: number;
  payoutInfoMissing: boolean;
  invoiceNeeded?: boolean;
  projectLeaderView?: boolean;
  onPaymentCancel: () => void;
} & Partial<PaymentRequestDetailsFragment>;

const Details = ({ children }: PropsWithChildren) => (
  <div className="flex flex-row gap-2 items-center text-greyscale-300 font-walsheim font-normal text-sm">
    {children}
  </div>
);

export default function View({
  id,
  loading,
  userId,
  githubUserId,
  status,
  amountInUsd,
  githubRecipient,
  requestor,
  requestedAt,
  workItems,
  payoutInfoMissing,
  invoiceNeeded,
  invoiceReceivedAt,
  paymentsAggregate,
  projectLeaderView,
  onPaymentCancel,
  ...props
}: Props) {
  const { T } = useIntl();

  return (
    <SidePanel
      {...props}
      title={T("payment.table.detailsPanel.title", { id: pretty(id) })}
      action={
        projectLeaderView && status === PaymentStatus.WAITING_PAYMENT ? (
          <CancelPaymentButton onPaymentCancel={onPaymentCancel} />
        ) : undefined
      }
    >
      <QueryWrapper query={{ loading, data: requestedAt }}>
        <div className="flex flex-col gap-2">
          <PayoutStatus
            {...{
              id: "details-payout-status",
              status: status,
              payoutInfoMissing,
              invoiceNeeded: invoiceNeeded && !invoiceReceivedAt,
              isProjectLeaderView: projectLeaderView,
            }}
          />
          <div className="font-belwe font-normal text-5xl text-greyscale-50">
            {formatMoneyAmount({ amount: amountInUsd })}
          </div>
          {requestor && (
            <Details>
              <RoundedImage alt={requestor.displayName} src={requestor.avatarUrl} size={ImageSize.Xxs} />
              {T(`payment.table.detailsPanel.from.${requestor.id === userId ? "you" : "other"}`, {
                user: requestor.displayName,
              })}
            </Details>
          )}
          {githubRecipient && (
            <Details>
              <RoundedImage alt={githubRecipient.login} src={githubRecipient.avatarUrl} size={ImageSize.Xxs} />
              {T(`payment.table.detailsPanel.to.${githubRecipient.id === githubUserId ? "you" : "other"}`, {
                user: githubRecipient.login,
              })}
            </Details>
          )}
          <Details>
            <Time className="text-base" />
            {T("payment.table.detailsPanel.requestedAt", { requestedAt: displayRelativeDate(requestedAt) })}
          </Details>
          {status === PaymentStatus.ACCEPTED && (
            <Details>
              <CheckLine className="text-base" />
              {T("payment.table.detailsPanel.processedAt", {
                processedAt: displayRelativeDate(paymentsAggregate?.aggregate?.max?.processedAt),
              })}
            </Details>
          )}
        </div>
        <div className="border-t border-greyscale-50/12" />
        <div className="flex flex-col gap-3 overflow-hidden -mr-4 h-full">
          <div className="font-belwe font-normal text-base text-greyscale-50">
            {T("payment.table.detailsPanel.workItems")}
          </div>
          <div className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
            {workItems?.map(
              workItem =>
                workItem.githubIssue && <GithubIssue key={workItem.githubIssue?.id} workItem={workItem.githubIssue} />
            )}
          </div>
        </div>
      </QueryWrapper>
    </SidePanel>
  );
}

type CancelPaymentButtonProps = {
  onPaymentCancel: () => void;
};

function CancelPaymentButton({ onPaymentCancel }: CancelPaymentButtonProps) {
  const { T } = useIntl();

  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => setModalOpened(!modalOpened);
  const closeModal = () => setModalOpened(false);

  return (
    <div className="relative">
      <Button size={ButtonSize.Sm} onClick={toggleModal} hover={modalOpened}>
        <ErrorWarningLine />
        {T("payment.table.detailsPanel.cancelPayment.button")}
      </Button>
      <div
        className={classNames("absolute -inset-x-10 top-10", {
          hidden: !modalOpened,
        })}
      >
        <ConfirmationModal
          onClose={closeModal}
          onConfirm={() => {
            onPaymentCancel();
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
