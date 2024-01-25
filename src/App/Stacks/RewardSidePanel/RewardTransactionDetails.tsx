import React, { ReactElement } from "react";
import { UseGetRewards } from "src/api/Mixed/queries";
import { useIntl } from "src/hooks/useIntl";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import Time from "src/icons/TimeLine";
import BankCardLine from "src/icons/BankCardLine";
import { compareDateToNow, formatDateTime } from "src/utils/date";
import { formatReceipt } from "src/App/Stacks/RewardSidePanel/View";
import { cn } from "src/utils/cn";

interface Props {
  isMine: boolean | undefined;
  status: UseGetRewards["status"];
  currency: UseGetRewards["currency"];
  createdAt: string;
  unlockDate?: string;
  processedAt?: string;
  receipt: UseGetRewards["receipt"];
}

const DetailRow = ({
  icon,
  label,
  date,
  additionalClass,
}: {
  icon: ReactElement;
  label: string;
  date: string;
  additionalClass?: string;
}) => (
  <div className="flex flex-row items-center gap-2">
    {icon}
    <div className={cn("font-walsheim text-sm font-normal", additionalClass)}>
      <span>{label}</span>
      <span className="text-greyscale-300">{date}</span>
    </div>
  </div>
);

export function RewardTransactionDetails({
  isMine,
  status,
  currency,
  createdAt,
  unlockDate,
  processedAt,
  receipt,
}: Props) {
  const { T } = useIntl();
  const formattedReceipt = isMine ? formatReceipt(receipt) : null;
  const unlockDateRelativeToNow = compareDateToNow(unlockDate);

  const isLocked = status === "LOCKED";
  const isComplete = status === "COMPLETE" && processedAt;

  function renderLockedStatus() {
    return (
      <>
        <div
          className={cn("ml-2 h-4 w-full border-l border-greyscale-50/20", {
            "border-dashed": unlockDateRelativeToNow.status !== "past",
          })}
        ></div>
        <DetailRow
          icon={
            <div className="pseudo-outline h-fit w-fit min-w-max shrink-0 rounded-md before:border-greyscale-50/20">
              <CurrencyIcons
                currency={currency}
                className={cn("h-4 w-4", { grayscale: unlockDateRelativeToNow.status !== "past" })}
              />
            </div>
          }
          label={T(
            unlockDateRelativeToNow.status === "past"
              ? "reward.table.detailsPanel.transactionDetails.unlockedLabel"
              : "reward.table.detailsPanel.transactionDetails.lockedLabel"
          )}
          date={T(
            unlockDateRelativeToNow.status === "past"
              ? "reward.table.detailsPanel.transactionDetails.onDate"
              : unlockDateRelativeToNow.status === "future"
              ? "reward.table.detailsPanel.transactionDetails.untilDate"
              : "reward.table.detailsPanel.transactionDetails.untilFurther",
            {
              date: unlockDate ? formatDateTime(new Date(unlockDate)) : null,
            }
          )}
        />
      </>
    );
  }

  function renderCompletedStatus() {
    return (
      <>
        <div className="ml-2 h-4 w-full border-l border-greyscale-50/20"></div>
        <DetailRow
          icon={<BankCardLine className="text-base" />}
          label={T("reward.table.detailsPanel.transactionDetails.processedLabel")}
          date={T("reward.table.detailsPanel.transactionDetails.onDate", {
            date: processedAt ? formatDateTime(new Date(processedAt)) : null,
          })}
        />
        {formattedReceipt && (
          <div className="ml-6 font-walsheim text-sm font-normal">
            {T(`reward.table.detailsPanel.processedVia.${formattedReceipt.type}`, {
              recipient: formattedReceipt.shortDetails,
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-1 pt-8">
      <div className="mb-2 font-belwe text-base font-normal text-greyscale-50">
        {T("reward.table.detailsPanel.transactionDetails.title")}
      </div>
      <DetailRow
        icon={<Time className="text-base" />}
        label={T("reward.table.detailsPanel.transactionDetails.createdLabel")}
        date={formatDateTime(new Date(createdAt))}
      />
      {isLocked && renderLockedStatus()}
      {isComplete && renderCompletedStatus()}
    </div>
  );
}
