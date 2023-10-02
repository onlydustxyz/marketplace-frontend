import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import Medal2Fill from "src/icons/Medal2Fill";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function ContributionReward({ id, rewards }: { id: string; rewards: { paymentId: string }[] }) {
  const { T } = useIntl();
  const count = rewards.length;
  const tooltipId = `${id}-${rewards?.[0].paymentId ?? "rewards"}`;

  return (
    <>
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
        <div className="flex items-center gap-2 px-1 py-2">
          <Medal2Fill className="text-sm leading-none text-orange-400" />
          <p className="text-sm font-medium leading-none">
            {T("contributions.tooltip.rewards")}&nbsp;
            {rewards.map(({ paymentId }) => formatPaymentId(paymentId)).join(", ")}
          </p>
        </div>
      </Tooltip>
      <div data-tooltip-id={tooltipId}>
        <ContributionAttribute className="hover:border-greyscale-50/20 hover:bg-orange-900">
          <div className="flex items-center gap-1 leading-none text-orange-400">
            <Medal2Fill className="text-sm leading-none" />
            {count > 1 ? <span className="text-sm leading-none">{count}</span> : null}
          </div>
        </ContributionAttribute>
      </div>
    </>
  );
}
