import { useIntl } from "src/hooks/useIntl";
import { formatDateTime } from "src/utils/date";

export function useUnlockDetailRow({
  unlockDateRelativeToNowStatus,
  unlockDate,
}: {
  unlockDateRelativeToNowStatus: string;
  unlockDate: string | null | undefined;
}) {
  const { T } = useIntl();
  let labelKey: string;
  let dateKey: string;
  let dateValue: string | null = null;

  switch (unlockDateRelativeToNowStatus) {
    case "past":
      labelKey = "reward.table.detailsPanel.transactionDetails.unlockedLabel";
      dateKey = "reward.table.detailsPanel.transactionDetails.onDate";
      dateValue = unlockDate ? formatDateTime(new Date(unlockDate)) : null;
      break;
    case "future":
      labelKey = "reward.table.detailsPanel.transactionDetails.lockedLabel";
      dateKey = "reward.table.detailsPanel.transactionDetails.untilDate";
      dateValue = unlockDate ? formatDateTime(new Date(unlockDate)) : null;
      break;
    default:
      labelKey = "reward.table.detailsPanel.transactionDetails.lockedLabel";
      dateKey = "reward.table.detailsPanel.transactionDetails.untilFurther";
      break;
  }

  return {
    label: T(labelKey),
    date: T(dateKey, { date: dateValue }),
  };
}
