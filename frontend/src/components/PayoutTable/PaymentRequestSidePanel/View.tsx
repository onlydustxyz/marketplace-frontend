import { PropsWithChildren, useState } from "react";
import GithubIssue from "src/components/GithubIssue";
import PayoutStatus from "src/components/PayoutStatus";
import QueryWrapper from "src/components/QueryWrapper";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { pretty } from "src/utils/id";
import { formatMoneyAmount } from "src/utils/money";
import { PaymentRequestDetailsFragment } from "src/__generated/graphql";
import Button, { ButtonSize } from "src/components/Button";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import ConfirmationModal from "./ConfirmationModal";
import classNames from "classnames";
import { issueToWorkItem } from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Issues";
import { formatDateTime } from "src/utils/date";
import BankCardLine from "src/icons/BankCardLine";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Tooltip, { withCustomTooltip } from "src/components/Tooltip";
import IBAN from "iban";
import ExternalLink from "src/components/ExternalLink";
import isDefined from "src/utils/isDefined";
import ClickableUser from "src/components/ClickableUser";

enum Align {
  Top = "top",
  Center = "center",
}

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
  onPaymentCancel?: () => void;
} & Partial<PaymentRequestDetailsFragment>;

const Details = ({ align = Align.Center, children }: PropsWithChildren & { align?: Align }) => (
  <div
    className={classNames("flex flex-row gap-2 text-greyscale-300 font-walsheim font-normal text-sm", {
      "items-center": align === Align.Center,
      "items-start": align === Align.Top,
    })}
  >
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
  liveGithubRecipient,
  requestor,
  requestedAt,
  workItems,
  payoutInfoMissing,
  invoiceNeeded,
  invoiceReceivedAt,
  payments,
  projectLeaderView,
  onPaymentCancel,
  ...props
}: Props) {
  const { T } = useIntl();

  const formattedReceipt = formatReceipt(payments?.at(0)?.receipt);

  return (
    <SidePanel
      {...props}
      action={
        projectLeaderView && onPaymentCancel && status === PaymentStatus.WAITING_PAYMENT ? (
          <CancelPaymentButton onPaymentCancel={onPaymentCancel} />
        ) : undefined
      }
    >
      <QueryWrapper query={{ loading, data: requestedAt }}>
        <div className="flex flex-col gap-8 h-full">
          <div className="font-belwe font-normal text-2xl text-greyscale-50 pt-8 px-6">
            {T("payment.table.detailsPanel.title", { id: pretty(id) })}
          </div>
          <div className="flex flex-col gap-2 px-6">
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
            {requestor?.login && (
              <Details>
                <RoundedImage alt={requestor.login || ""} src={requestor.avatarUrl || ""} size={ImageSize.Xxs} />
                <div className="flex flex-row items-center gap-1">
                  {T("payment.table.detailsPanel.from")}
                  <ClickableUser name={requestor.login} githubUserId={requestor.githubUserId} />
                  {requestor.id === userId && T("payment.table.detailsPanel.you")}
                </div>
              </Details>
            )}
            {liveGithubRecipient && (
              <Details>
                <RoundedImage
                  alt={liveGithubRecipient.login}
                  src={liveGithubRecipient.avatarUrl}
                  size={ImageSize.Xxs}
                />
                <div className="flex flex-row items-center gap-1">
                  {T("payment.table.detailsPanel.to")}
                  <ClickableUser name={liveGithubRecipient.login} githubUserId={liveGithubRecipient.id} />
                  {liveGithubRecipient.id === githubUserId && T("payment.table.detailsPanel.you")}
                </div>
              </Details>
            )}
            {requestedAt && (
              <Details>
                <Time className="text-base" />
                {T("payment.table.detailsPanel.requestedAt", { requestedAt: formatDateTime(new Date(requestedAt)) })}
              </Details>
            )}
            {status === PaymentStatus.ACCEPTED && payments?.at(0)?.processedAt && (
              <Details align={formattedReceipt ? Align.Top : Align.Center}>
                <BankCardLine className="text-base" />
                <ReactMarkdown
                  className="payment-receipt whitespace-pre-wrap"
                  {...withCustomTooltip("payment-receipt-tooltip")}
                >
                  {[
                    T("payment.table.detailsPanel.processedAt", {
                      processedAt: formatDateTime(new Date(payments?.at(0)?.processedAt)),
                    }),
                    formattedReceipt &&
                      T(`payment.table.detailsPanel.processedVia.${formattedReceipt?.type}`, {
                        recipient: formattedReceipt?.shortDetails,
                      }),
                  ]
                    .filter(isDefined)
                    .join("\n")}
                </ReactMarkdown>
                {formattedReceipt && (
                  <Tooltip anchorSelect=".payment-receipt" clickable>
                    <div className="flex flex-col items-start">
                      <div>
                        {T(`payment.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.recipient`, {
                          recipient: formattedReceipt?.fullDetails,
                        })}
                      </div>

                      {formattedReceipt?.type === "crypto" ? (
                        <ExternalLink
                          url={`https://etherscan.io/tx/${formattedReceipt?.reference}`}
                          text={T(`payment.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.reference`, {
                            reference: formattedReceipt?.reference,
                          })}
                        />
                      ) : (
                        <div>
                          {T(`payment.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.reference`, {
                            reference: formattedReceipt?.reference,
                          })}
                        </div>
                      )}
                    </div>
                  </Tooltip>
                )}
              </Details>
            )}
          </div>
          <div className="px-6">
            <div className="border-t border-greyscale-50/12" />
          </div>
          <div className="flex flex-col gap-3 overflow-hidden -mr-4 h-full px-6">
            <div className="font-belwe font-normal text-base text-greyscale-50">
              {T("payment.table.detailsPanel.workItems")}
            </div>
            <div className="flex flex-col gap-3 h-full p-px pr-4 pb-6 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
              {workItems?.map(
                workItem =>
                  workItem.githubIssue && (
                    <GithubIssue key={workItem.githubIssue?.id} workItem={issueToWorkItem(workItem.githubIssue)} />
                  )
              )}
            </div>
          </div>
        </div>
      </QueryWrapper>
    </SidePanel>
  );
}

type Receipt = {
  OnChainPayment?: { recipient_address: string; recipient_ens?: string; transaction_hash: string };
  FiatPayment?: { recipient_iban: string; transaction_reference: string };
};

type FormattedReceipt = {
  type: "crypto" | "fiat";
  shortDetails: string;
  fullDetails: string;
  reference: string;
};

const formatReceipt = (receipt?: Receipt): FormattedReceipt | undefined => {
  if (receipt?.OnChainPayment) {
    const address = receipt?.OnChainPayment.recipient_address;
    const ens = receipt?.OnChainPayment.recipient_ens;

    return {
      type: "crypto",
      shortDetails: ens ?? `0x...${address.substring(address.length - 5)}`,
      fullDetails: address,
      reference: receipt?.OnChainPayment.transaction_hash,
    };
  } else if (receipt?.FiatPayment) {
    const iban = receipt?.FiatPayment.recipient_iban;
    return {
      type: "fiat",
      shortDetails: `**** ${iban.substring(iban.length - 3)}`,
      fullDetails: IBAN.printFormat(iban),
      reference: receipt?.FiatPayment.transaction_reference,
    };
  }
};

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
      <Button size={ButtonSize.Sm} onClick={toggleModal} pressed={modalOpened} data-testid="cancel-payment-button">
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
