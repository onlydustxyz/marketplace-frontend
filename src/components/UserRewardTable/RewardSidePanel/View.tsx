import IBAN from "iban";
import { PropsWithChildren, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { components } from "src/__generated/api";
import {
  GithubCodeReviewFragment,
  GithubIssueFragment,
  GithubPullRequestWithCommitsFragment,
  GithubUserFragment,
  PaymentRequestDetailsFragment,
} from "src/__generated/graphql";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize } from "src/components/Button";
import Contributor from "src/components/Contributor";
import ExternalLink from "src/components/ExternalLink";
import GithubCodeReview from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import GithubIssue from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import PayoutStatus from "src/components/PayoutStatus/PayoutStatus";
import QueryWrapper from "src/components/QueryWrapper";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import Tooltip, { TooltipPosition, withCustomTooltip } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import BankCardLine from "src/icons/BankCardLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { PaymentStatus } from "src/types";
import { cn } from "src/utils/cn";
import { formatDateTime } from "src/utils/date";
import { pretty } from "src/utils/id";
import isDefined from "src/utils/isDefined";
import { currencyToNetwork, formatMoneyAmount } from "src/utils/money";
import ConfirmationModal from "./ConfirmationModal";
import { GithubContributionType } from "src/types";

enum Align {
  Top = "top",
  Center = "center",
}

export type Props = {
  data: components["schemas"]["ProjectRewardResponse"];
  loading: boolean;
  //   status: PaymentStatus;
  //   payoutInfoMissing: boolean;
  //   invoiceNeeded?: boolean;
  projectLeaderView?: boolean;
  onRewardCancel?: () => void;
} & Partial<PaymentRequestDetailsFragment>;

export default function View({
  id,
  data,
  loading,
  //   status,
  amount,
  githubRecipient,
  requestor,
  requestedAt,
  workItems,
  //   payoutInfoMissing,
  //   invoiceNeeded,
  invoiceReceivedAt,
  payments,
  projectLeaderView,
  onRewardCancel,
}: Props) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  // TODO get from response
  const formattedReceipt = formatReceipt(payments?.at(0)?.receipt);
  // TODO which status ?
  const shouldDisplayCancelButton = projectLeaderView && onRewardCancel && status === PaymentStatus.WAITING_PAYMENT;

  function formatRewardItemToGithubPullRequest(item: components["schemas"]["RewardItemResponse"]) {
    return {
      id: item.id,
      number: item.number,
      title: item.title,
      createdAt: item.createdAt,
      // TODO lastUpdatedAt ?
      closedAt: item.closedAt,
      mergedAt: item.mergedAt,
      status: item.status,
      htmlUrl: item.githubUrl,
      // TODO
      userCommitsCount: {
        aggregate: {
          count: item.userCommitsCount,
        },
      },
      commitsCount: {
        aggregate: {
          count: item.commitsCount,
        },
      },
      repoId: null,
      author: {
        id: item.author.id,
        login: item.author.login,
        avatarUrl: item.author.avatarUrl,
        htmlUrl: "",
        user: null,
      },
    } as GithubPullRequestWithCommitsFragment;
  }

  function formatRewardItemToGithubIssue(item: components["schemas"]["RewardItemResponse"]) {
    return {
      id: item.id,
      createdAt: item.createdAt,
      // TODO lastUpdatedAt ?
      closedAt: item.closedAt,
      number: item.number,
      title: item.title,
      htmlUrl: item.githubUrl,
      status: item.status,
      commentsCount: item.commentsCount,
      repoId: null,
    } as GithubIssueFragment;
  }

  function formatRewardItemToGithubCodeReview(item: components["schemas"]["RewardItemResponse"]) {
    return {
      id: item.id,
      githubPullRequest: {
        number: item.number,
        title: item.title,
        htmlUrl: item.githubUrl,
        createdAt: item.createdAt,
        repoId: null,
        status: null,
        closedAt: null,
        mergedAt: null,
        id: null,
        author: {
          id: null,
          htmlUrl: "",
          avatarUrl: "",
          login: "",
          user: null,
        },
      },
      status: item.status,
      submittedAt: item.createdAt,
      // TODO
      outcome: item.status,
    } as GithubCodeReviewFragment;
  }

  function renderRewardItem(item: components["schemas"]["RewardItemResponse"]) {
    return null;
    switch (item.type) {
      case GithubContributionType.PullRequest: {
        return (
          <GithubPullRequest
            pullRequest={formatRewardItemToGithubPullRequest(item)}
            // TODO contributor = {login : string;}
            contributor={githubRecipient as GithubUserFragment}
          />
        );
      }
      case GithubContributionType.Issue: {
        return <GithubIssue issue={formatRewardItemToGithubIssue(item)} />;
      }
      case GithubContributionType.CodeReview: {
        return <GithubCodeReview codeReview={formatRewardItemToGithubCodeReview(item)} />;
      }
      default: {
        return null;
      }
    }
  }

  return (
    <QueryWrapper query={{ loading, data }}>
      {data ? (
        <div className="flex h-full flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3 px-6 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
            {T("reward.table.detailsPanel.title", { id: pretty(id) })}
            {shouldDisplayCancelButton && <CancelRewardButton onRewardCancel={onRewardCancel} />}
          </div>
          <div className="flex flex-col gap-2 px-6">
            <div className="flex flex-wrap items-center gap-2">
              <PayoutStatus status={data.status} />
              <div className="flex items-center gap-1 font-walsheim text-xs text-spaceBlue-200">
                <InfoIcon className="h-4 w-3" />
                <span>
                  {T("reward.table.detailsPanel.rewardGrantedOnNetwork", { network: currencyToNetwork(data.currency) })}
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="flex items-baseline gap-1 font-belwe text-5xl font-normal text-greyscale-50">
                <span>{formatMoneyAmount({ amount: data.amount, currency: data.currency })}</span>
                <span className="text-3xl">{data.currency}</span>
              </div>
              {data.dollarsEquivalent ? (
                <>
                  <Tooltip id="reward-detail-usd-est" position={TooltipPosition.Top}>
                    {T("reward.table.detailsPanel.usdEstimateTooltip")}
                  </Tooltip>
                  <span className="font-walsheim text-xl text-spaceBlue-200" data-tooltip-id="reward-detail-usd-est">
                    ~{formatMoneyAmount({ amount: data.dollarsEquivalent })}
                  </span>
                </>
              ) : null}
            </div>
            {data.from ? (
              <Details>
                <RoundedImage alt={data.from.login ?? ""} src={data.from.avatarUrl ?? ""} size={ImageSize.Xxs} />
                <div className="flex flex-row items-center gap-1">
                  {T("reward.table.detailsPanel.from")}
                  <Contributor
                    contributor={{
                      login: data.from.login ?? "",
                      githubUserId: data.from.id ?? 0,
                      avatarUrl: null,
                    }}
                    clickable
                  />
                  {data.from.id === githubUserId && T("reward.table.detailsPanel.you")}
                </div>
              </Details>
            ) : null}
            {data.to ? (
              <Details>
                <RoundedImage alt={data.to.login ?? ""} src={data.to.avatarUrl ?? ""} size={ImageSize.Xxs} />
                <div className="flex flex-row items-center gap-1">
                  {T("reward.table.detailsPanel.to")}
                  <Contributor
                    contributor={{
                      login: data.to.login ?? "",
                      githubUserId: data.to.id ?? 0,
                      avatarUrl: null,
                    }}
                    clickable
                  />
                  {data.to.id === githubUserId && T("reward.table.detailsPanel.you")}
                </div>
              </Details>
            ) : null}
            {data.createdAt && (
              <Details>
                <Time className="text-base" />
                {T("reward.table.detailsPanel.requestedAt", { requestedAt: formatDateTime(new Date(data.createdAt)) })}
              </Details>
            )}
            {data.status === PaymentStatus.COMPLETE && data.processedAt ? (
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
                {
                  // TODO
                  formattedReceipt && (
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
                  )
                }
              </Details>
            ) : null}
          </div>
          <div className="px-6">
            <div className="border-t border-greyscale-50/12" />
          </div>
          <div className="flex h-full flex-col gap-3 overflow-hidden px-6">
            <div className="font-belwe text-base font-normal text-greyscale-50">
              {T("reward.table.detailsPanel.contributions")}
            </div>
            <div className="flex h-full flex-col gap-3 overflow-auto p-px pb-6 pr-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
              {data.rewardItems.map(item => renderRewardItem(item))}
            </div>
          </div>
        </div>
      ) : null}
    </QueryWrapper>
  );
}

const Details = ({ align = Align.Center, children }: PropsWithChildren & { align?: Align }) => (
  <div
    className={cn("flex flex-row gap-2 font-walsheim text-sm font-normal text-greyscale-300", {
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
        className={cn("absolute top-10 z-10 xl:-inset-x-10", {
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
