import InfoIcon from "src/assets/icons/InfoIcon";
import Card from "src/components/Card";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Currency } from "src/types";
import { cn } from "src/utils/cn";
import { formatMoneyAmount } from "src/utils/money";

interface Props {
  amount: number;
  className?: string;
}

export function TotalEarningCard({ amount, className }: Props) {
  const { T } = useIntl();

  return (
    <Card className={cn("bg-budget bg-origin-border p-8", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm text-white">
          <span className="mr-2" {...withTooltip(T("reward.details.earning.usdInfoEarnings"))}>
            <InfoIcon />
          </span>

          {T("reward.details.earning.totalEarnings")}
        </div>
        <div className="flex flex-wrap items-center font-belwe text-2xl text-greyscale-50">
          {formatMoneyAmount({ amount, currency: Currency.USD })}
        </div>
      </div>
    </Card>
  );
}
