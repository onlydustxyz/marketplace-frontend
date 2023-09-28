import classNames from "classnames";
import IBAN from "iban";
import { PropsWithChildren, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PaymentRequestDetailsFragment } from "src/__generated/graphql";
import Button, { ButtonSize } from "src/components/Button";
import Contributor from "src/components/Contributor";
import ExternalLink from "src/components/ExternalLink";
import GithubCodeReview from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import GithubIssue from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import PayoutStatus from "src/components/PayoutStatus";
import QueryWrapper from "src/components/QueryWrapper";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import Tooltip, { withCustomTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import BankCardLine from "src/icons/BankCardLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { formatDateTime } from "src/utils/date";
import { pretty } from "src/utils/id";
import isDefined from "src/utils/isDefined";
import { formatMoneyAmount } from "src/utils/money";
import ConfirmationModal from "./ConfirmationModal";

enum Align {
  Top = "top",
  Center = "center",
}

export type Props = {
  loading: boolean;
  status: PaymentStatus;
  userId?: string;
  githubUserId?: number;
  payoutInfoMissing: boolean;
  invoiceNeeded?: boolean;
  projectLeaderView?: boolean;
  onRewardCancel?: () => void;
} & Partial<PaymentRequestDetailsFragment>;

export default function View({
  id,
  loading,
  userId,
  githubUserId,
  status,
  amount,
  githubRecipient,
  requestor,
  requestedAt,
  workItems,
  payoutInfoMissing,
  invoiceNeeded,
  invoiceReceivedAt,
  payments,
  projectLeaderView,
  onRewardCancel,
}: Props) {
  const { T } = useIntl();
  const formattedReceipt = formatReceipt(payments?.at(0)?.receipt);

  const shouldDisplayCancelButton = projectLeaderView && onRewardCancel && status === PaymentStatus.WAITING_PAYMENT;

  return (
    <QueryWrapper query={{ loading, data: requestedAt }}>
      <div className="flex h-full flex-col gap-8">
        <div className="flex flex-wrap items-center gap-3 px-6 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("reward.table.detailsPanel.title", { id: pretty(id) })}
          {shouldDisplayCancelButton && <CancelRewardButton onRewardCancel={onRewardCancel} />}
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
          <div className="font-belwe text-5xl font-normal text-greyscale-50">
            {formatMoneyAmount({ amount: amount })}
          </div>
          {requestor?.login && (
            <Details>
              <RoundedImage alt={requestor.login || ""} src={requestor.avatarUrl || ""} size={ImageSize.Xxs} />
              <div className="flex flex-row items-center gap-1">
                {T("reward.table.detailsPanel.from")}
                <Contributor
                  contributor={{
                    login: requestor.login || "",
                    githubUserId: requestor.githubUserId,
                    avatarUrl: null,
                  }}
                  clickable
                />
                {requestor.id === userId && T("reward.table.detailsPanel.you")}
              </div>
            </Details>
          )}
          {githubRecipient && (
            <Details>
              <RoundedImage alt={githubRecipient.login} src={githubRecipient.avatarUrl} size={ImageSize.Xxs} />
              <div className="flex flex-row items-center gap-1">
                {T("reward.table.detailsPanel.to")}
                <Contributor
                  contributor={{
                    login: githubRecipient.login,
                    githubUserId: githubRecipient.id,
                    avatarUrl: null,
                  }}
                  clickable
                />
                {githubRecipient.id === githubUserId && T("reward.table.detailsPanel.you")}
              </div>
            </Details>
          )}
          {requestedAt && (
            <Details>
              <Time className="text-base" />
              {T("reward.table.detailsPanel.requestedAt", { requestedAt: formatDateTime(new Date(requestedAt)) })}
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
                  T("reward.table.detailsPanel.processedAt", {
                    processedAt: formatDateTime(new Date(payments?.at(0)?.processedAt)),
                  }),
                  formattedReceipt &&
                    T(`reward.table.detailsPanel.processedVia.${formattedReceipt?.type}`, {
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
                      {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.recipient`, {
                        recipient: formattedReceipt?.fullDetails,
                      })}
                    </div>

                    {formattedReceipt?.type === "crypto" ? (
                      <ExternalLink
                        url={`https://etherscan.io/tx/${formattedReceipt?.reference}`}
                        text={T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.reference`, {
                          reference: formattedReceipt?.reference,
                        })}
                      />
                    ) : (
                      <div>
                        {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt?.type}.reference`, {
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
        <div className="flex h-full flex-col gap-3 overflow-hidden px-6">
          <div className="font-belwe text-base font-normal text-greyscale-50">
            {T("reward.table.detailsPanel.contributions")}
          </div>
          <div className="flex h-full flex-col gap-3 overflow-auto p-px pb-6 pr-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
            {workItems?.map(workItem => {
              return workItem.githubIssue ? (
                <GithubIssue key={workItem.githubIssue?.id} issue={workItem.githubIssue} />
              ) : workItem.githubPullRequest ? (
                <GithubPullRequest key={workItem.githubPullRequest?.id} pullRequest={workItem.githubPullRequest} />
              ) : workItem.githubCodeReview ? (
                <GithubCodeReview key={workItem.githubCodeReview?.id} codeReview={workItem.githubCodeReview} />
              ) : undefined;
            })}
          </div>
        </div>
      </div>
    </QueryWrapper>
  );
}

const Details = ({ align = Align.Center, children }: PropsWithChildren & { align?: Align }) => (
  <div
    className={classNames("flex flex-row gap-2 font-walsheim text-sm font-normal text-greyscale-300", {
      "items-center": align === Align.Center,
      "items-start": align === Align.Top,
    })}
  >
    {children}
  </div>
);

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

type CancelRewardButtonProps = {
  onRewardCancel: () => void;
};

function CancelRewardButton({ onRewardCancel }: CancelRewardButtonProps) {
  const { T } = useIntl();

  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => setModalOpened(!modalOpened);
  const closeModal = () => setModalOpened(false);

  return (
    <div className="relative">
      <Button size={ButtonSize.Sm} onClick={toggleModal} pressed={modalOpened} data-testid="cancel-reward-button">
        <ErrorWarningLine />
        {T("reward.table.detailsPanel.cancelReward.button")}
      </Button>
      <div
        className={classNames("absolute top-10 z-10 xl:-inset-x-10", {
          hidden: !modalOpened,
        })}
      >
        <ConfirmationModal
          onClose={closeModal}
          onConfirm={() => {
            onRewardCancel();
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
