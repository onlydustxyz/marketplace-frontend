import { UseMutateFunction } from "@tanstack/react-query";
import IBAN from "iban";
import { PropsWithChildren, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { components } from "src/__generated/api";
import { GithubUserFragment } from "src/__generated/graphql";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize } from "src/components/Button";
import Contributor from "src/components/Contributor";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import ExternalLink from "src/components/ExternalLink";
import GithubCodeReview from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import GithubIssue from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import PayoutStatus from "src/components/PayoutStatus/PayoutStatus";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { ShowMore } from "src/components/Table/ShowMore";
import Tooltip, { TooltipPosition, withCustomTooltip } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import useInfiniteRewardItems from "src/hooks/useInfiniteRewardItems";
import { useIntl } from "src/hooks/useIntl";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import BankCardLine from "src/icons/BankCardLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Time from "src/icons/TimeLine";
import { Currency, GithubContributionType, PaymentStatus } from "src/types";
import {
  formatRewardItemToGithubCodeReview,
  formatRewardItemToGithubIssue,
  formatRewardItemToGithubPullRequest,
} from "src/utils/api";
import { cn } from "src/utils/cn";
import { formatDateTime } from "src/utils/date";
import { pretty } from "src/utils/id";
import isDefined from "src/utils/isDefined";
import { currencyToNetwork, formatMoneyAmount } from "src/utils/money";
import ConfirmationModal from "./ConfirmationModal";
import { SkeletonDetail } from "./SkeletonDetail";
import { SkeletonItems } from "./SkeletonItems";

enum Align {
  Top = "top",
  Center = "center",
}

export type Props = {
  rewardId: string;
  projectLeaderView?: boolean;
  onRewardCancel?: UseMutateFunction<unknown, Error, unknown, unknown>;
};

type ProjectProps = {
  projectId: string;
  isMine?: never;
} & Props;

type MyProps = {
  projectId?: never;
  isMine: true;
} & Props;

export default function View({
  projectId,
  rewardId,
  onRewardCancel,
  projectLeaderView,
  isMine,
}: ProjectProps | MyProps) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();

  const {
    data,
    isLoading: loading,
    isError,
  } = useRestfulData<components["schemas"]["RewardResponse"]>({
    resourcePath: isMine ? ApiResourcePaths.GET_MY_REWARD_BY_ID : ApiResourcePaths.PROJECT_REWARD,
    pathParam: isMine ? rewardId : { projectId, rewardId },
    method: "GET",
  });

  const infiniteOptions = isMine ? { isMine } : { projectId };

  const {
    data: rewardItemsData,
    error: rewardItemsError,
    isLoading: rewardItemsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRewardItems({ rewardId, enabled: Boolean(data), ...infiniteOptions });

  const rewardItems = rewardItemsData?.pages.flatMap(page => page.rewardItems) || [];

  const formattedReceipt = isMine ? formatReceipt(data?.receipt) : null;
  const shouldDisplayCancelButton = projectLeaderView && onRewardCancel && data?.status !== PaymentStatus.COMPLETE;
  const isCurrencyUSD = data?.currency === Currency.USD;

  function renderRewardItems() {
    if (rewardItemsLoading) {
      return (
        <div className="py-8">
          <SkeletonItems />
        </div>
      );
    }

    if (rewardItemsError) {
      return (
        <p className="whitespace-pre-line py-24 text-center font-walsheim text-sm text-greyscale-50">
          {T("reward.table.detailsPanel.rewardItems.error")}
        </p>
      );
    }

    if (rewardItems.length) {
      return (
        <div className="flex h-full flex-col gap-3 overflow-hidden pt-8">
          <div className="font-belwe text-base font-normal text-greyscale-50">
            {T("reward.table.detailsPanel.contributions")}
          </div>
          <div className="flex h-full flex-col gap-3 overflow-auto p-px pb-6 pr-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
            {rewardItems.map(item => {
              switch (item.type) {
                case GithubContributionType.PullRequest: {
                  return (
                    <GithubPullRequest
                      key={item.id}
                      pullRequest={formatRewardItemToGithubPullRequest(item)}
                      contributor={data?.to as GithubUserFragment}
                    />
                  );
                }
                case GithubContributionType.Issue: {
                  return <GithubIssue key={item.id} issue={formatRewardItemToGithubIssue(item)} />;
                }
                case GithubContributionType.CodeReview: {
                  return <GithubCodeReview key={item.id} codeReview={formatRewardItemToGithubCodeReview(item)} />;
                }
                default: {
                  return null;
                }
              }
            })}
          </div>
          {hasNextPage ? (
            <div className="pt-6">
              <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null}
        </div>
      );
    }

    return null;
  }

  function renderDetail() {
    if (loading) {
      return (
        <div className="px-6 py-8">
          <SkeletonDetail />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex h-full items-center justify-center px-6">
          <p className="whitespace-pre-line text-center font-walsheim text-greyscale-50">
            {T("reward.table.detailsPanel.error")}
          </p>
        </div>
      );
    }

    if (data) {
      return (
        <div className="flex h-full flex-col gap-8 px-6">
          <div className="flex flex-wrap items-center gap-3 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
            {T("reward.table.detailsPanel.title", { id: pretty(data.id) })}
            {shouldDisplayCancelButton && <CancelRewardButton onRewardCancel={onRewardCancel} />}
          </div>
          <div className="flex flex-col gap-8 divide-y divide-greyscale-50/12">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <PayoutStatus status={data.status} />
                {!isCurrencyUSD ? (
                  <div className="flex items-center gap-1 font-walsheim text-xs text-spaceBlue-200">
                    <InfoIcon className="h-4 w-3" />
                    <span>
                      {T("reward.table.detailsPanel.rewardGrantedOnNetwork", {
                        network: currencyToNetwork(data.currency),
                      })}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex items-baseline gap-2">
                <div className="flex items-baseline gap-1 font-belwe text-5xl font-normal text-greyscale-50">
                  <div className="flex items-center gap-1">
                    <CurrencyIcons currency={data.currency} className="h-8 w-8" />
                    <span>
                      {formatMoneyAmount({ amount: data.amount, currency: data.currency, showCurrency: false })}
                    </span>
                  </div>
                  {!isCurrencyUSD ? <span className="text-3xl">{data.currency}</span> : null}
                </div>
                {!isCurrencyUSD && data.dollarsEquivalent ? (
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
                  {T("reward.table.detailsPanel.requestedAt", {
                    requestedAt: formatDateTime(new Date(data.createdAt)),
                  })}
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
                        processedAt: formatDateTime(new Date(data.processedAt)),
                      }),
                      formattedReceipt
                        ? T(`reward.table.detailsPanel.processedVia.${formattedReceipt.type}`, {
                            recipient: formattedReceipt.shortDetails,
                          })
                        : null,
                    ]
                      .filter(isDefined)
                      .join("\n")}
                  </ReactMarkdown>

                  {formattedReceipt ? (
                    <Tooltip anchorSelect=".payment-receipt" clickable>
                      <div className="flex flex-col items-start">
                        <div>
                          {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.recipient`, {
                            recipient: formattedReceipt.fullDetails,
                          })}
                        </div>

                        {formattedReceipt.type === "crypto" ? (
                          <ExternalLink
                            url={`https://etherscan.io/tx/${formattedReceipt.reference}`}
                            text={T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.reference`, {
                              reference: formattedReceipt.reference,
                            })}
                          />
                        ) : (
                          <div>
                            {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.reference`, {
                              reference: formattedReceipt.reference,
                            })}
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  ) : null}
                </Details>
              ) : null}
            </div>
            {renderRewardItems()}
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full items-center justify-center px-6">
        <p className="whitespace-pre-line text-center font-walsheim text-greyscale-50">
          {T("reward.table.detailsPanel.empty")}
        </p>
      </div>
    );
  }

  return renderDetail();
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

type FormattedReceipt = {
  type: "crypto" | "fiat";
  shortDetails: string;
  fullDetails: string;
  reference: string;
};

const formatReceipt = (receipt?: components["schemas"]["ReceiptResponse"]): FormattedReceipt | undefined => {
  if (receipt?.type === "CRYPTO") {
    const { ens, walletAddress: address = "", transactionReference: reference } = receipt;

    return {
      type: "crypto",
      shortDetails: ens ?? `0x...${address.substring(address.length - 5)}`,
      fullDetails: address,
      reference,
    };
  }

  if (receipt?.type === "FIAT") {
    const { iban = "", transactionReference: reference } = receipt;

    return {
      type: "fiat",
      shortDetails: `**** ${iban.substring(iban.length - 3)}`,
      fullDetails: IBAN.printFormat(iban),
      reference,
    };
  }
};

type CancelRewardButtonProps = {
  onRewardCancel: UseMutateFunction<unknown, Error, unknown, unknown>;
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
            onRewardCancel({});
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
