import { DetailRow } from "src/App/Stacks/RewardSidePanel/TransactionDetails/DetailRow";
import { FormattedReceipt } from "src/App/Stacks/RewardSidePanel/TransactionDetails/FormattedReceipt";
import { useUnlockDetailRow } from "src/App/Stacks/RewardSidePanel/TransactionDetails/useUnlockDetailRow";
import { UseGetRewards } from "src/api/Mixed/queries";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import BankCardLine from "src/icons/BankCardLine";
import Time from "src/icons/TimeLine";
import { cn } from "src/utils/cn";
import { compareDateToNow, formatDateTime } from "src/utils/date";

import { useIntl } from "hooks/translate/use-translate";

interface Props {
  isMine: boolean | undefined;
  status: UseGetRewards["status"];
  amount: UseGetRewards["amount"];
  createdAt: string;
  unlockDate?: string;
  processedAt?: string;
  receipt: UseGetRewards["receipt"];
}

export function RewardTransactionDetails({
  isMine,
  status,
  amount,
  createdAt,
  unlockDate,
  processedAt,
  receipt,
}: Props) {
  const { T } = useIntl();
  const unlockDateRelativeToNow = compareDateToNow(unlockDate);

  const isLocked = status === "LOCKED";
  const isComplete = status === "COMPLETE" && processedAt;
  const { label, date } = useUnlockDetailRow({
    unlockDateRelativeToNowStatus: unlockDateRelativeToNow.status,
    unlockDate,
  });
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
                currency={amount.currency}
                className={cn("h-4 w-4", { grayscale: unlockDateRelativeToNow.status !== "past" })}
              />
            </div>
          }
          label={label}
          date={date}
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
        {isMine ? <FormattedReceipt receipt={receipt} /> : null}
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
      {isLocked ? renderLockedStatus() : null}
      {isComplete ? renderCompletedStatus() : null}
    </div>
  );
}
