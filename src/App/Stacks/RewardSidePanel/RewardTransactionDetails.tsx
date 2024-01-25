import { UseGetRewards } from "src/api/Mixed/queries";
import { useIntl } from "src/hooks/useIntl";

interface Props {
  status: UseGetRewards["status"];
  currency: UseGetRewards["currency"];
  createdAt: string;
  processedAt?: string;
  receipt: UseGetRewards["receipt"];
}
export function RewardTransactionDetails({ status, currency, createdAt, processedAt, receipt }: Props) {
  const { T } = useIntl();
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-8">
      <div className="font-belwe text-base font-normal text-greyscale-50">
        {T("reward.table.detailsPanel.transactionDetails.title")}
      </div>
    </div>
  );
}
