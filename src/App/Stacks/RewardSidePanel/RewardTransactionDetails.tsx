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
  return (
    <div className="flex flex-col gap-1 pt-8">
      <div className="mb-2 font-belwe text-base font-normal text-greyscale-50">
        {T("reward.table.detailsPanel.transactionDetails.title")}
      </div>
      <div className="flex flex-row items-center gap-2">
        <Time className="text-base" />
        <div className="font-walsheim text-sm font-normal">
          <span>{T("reward.table.detailsPanel.transactionDetails.createdLabel")}</span>
          <span className="text-greyscale-300">
            {T("reward.table.detailsPanel.transactionDetails.onDate", {
              date: formatDateTime(new Date(createdAt)),
            })}
          </span>
        </div>
      </div>
      {status === "LOCKED" ? (
        <>
          <div
            className={cn("ml-2 h-4 w-full border-l border-greyscale-50/20", {
              "border-dashed":
                unlockDateRelativeToNow.status === "future" || unlockDateRelativeToNow.status === "invalid",
            })}
          ></div>
          <div className="flex flex-row items-center gap-2">
            <div className="pseudo-outline h-fit w-fit min-w-max shrink-0 rounded-md before:border-greyscale-50/20">
              <CurrencyIcons
                currency={currency}
                className={cn("h-4 w-4", {
                  grayscale:
                    unlockDateRelativeToNow.status === "future" || unlockDateRelativeToNow.status === "invalid",
                })}
              />
            </div>

            <div className="font-walsheim text-sm font-normal">
              <span>
                {unlockDateRelativeToNow.status === "past"
                  ? T("reward.table.detailsPanel.transactionDetails.unlockedLabel")
                  : T("reward.table.detailsPanel.transactionDetails.lockedLabel")}
              </span>
              <span className="text-greyscale-300">
                {T(
                  unlockDateRelativeToNow.status === "past"
                    ? "reward.table.detailsPanel.transactionDetails.onDate"
                    : unlockDateRelativeToNow.status === "future"
                    ? "reward.table.detailsPanel.transactionDetails.untilDate"
                    : "reward.table.detailsPanel.transactionDetails.untilFurther",
                  {
                    date: unlockDate ? formatDateTime(new Date(unlockDate)) : null,
                  }
                )}
              </span>
            </div>
          </div>
        </>
      ) : null}
      {status === "COMPLETE" && processedAt ? (
        <>
          <div className="ml-2 h-4 w-full border-l border-greyscale-50/20"></div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <BankCardLine className="text-base" />
              <div className="font-walsheim text-sm font-normal">
                <div>
                  <span>{T("reward.table.detailsPanel.transactionDetails.processedLabel")}</span>
                  <span className="text-greyscale-300">
                    {T("reward.table.detailsPanel.transactionDetails.onDate", {
                      date: formatDateTime(new Date(processedAt)),
                    })}
                  </span>
                </div>
              </div>
            </div>
            {formattedReceipt ? (
              <div className="ml-6 font-walsheim text-sm font-normal">
                {T(`reward.table.detailsPanel.processedVia.${formattedReceipt.type}`, {
                  recipient: formattedReceipt.shortDetails,
                })}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
