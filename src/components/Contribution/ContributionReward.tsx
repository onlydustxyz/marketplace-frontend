import { Fragment } from "react";
import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { useRewardDetailPanel } from "src/hooks/useRewardDetailPanel";
import Medal2Fill from "src/icons/Medal2Fill";
import { Contribution } from "src/types";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function ContributionReward({
  contributionId,
  projectId,
  rewardIds,
}: {
  contributionId: Contribution["id"];
  projectId: Contribution["project"]["id"];
  rewardIds: Contribution["rewardIds"];
}) {
  const { T } = useIntl();
  const count = rewardIds.length;
  const tooltipId = `${contributionId}-${rewardIds?.[0] ?? "rewards"}`;

  const { open } = useRewardDetailPanel();

  return (
    <>
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Bottom} variant={Variant.Blue}>
        <div className="flex items-center gap-2">
          <Medal2Fill className="text-sm leading-none text-orange-400" />
          <p className="text-sm font-medium leading-none">
            {T("contributions.tooltip.rewards")}&nbsp;
            {rewardIds.map((rewardId, i) => (
              <Fragment key={rewardId}>
                {i > 0 ? ", " : null}
                <button
                  type="button"
                  className="hover:underline"
                  onClick={() => {
                    open({ rewardId, projectId });
                  }}
                >
                  {formatPaymentId(rewardId)}
                </button>
              </Fragment>
            ))}
          </p>
        </div>
      </Tooltip>
      <button
        type="button"
        data-tooltip-id={tooltipId}
        className={count > 1 ? "cursor-default" : ""}
        onClick={() => {
          if (count === 1) {
            const [rewardId] = rewardIds;
            open({ rewardId, projectId });
          }
        }}
      >
        <ContributionAttribute className="hover:border-greyscale-50/20 hover:bg-orange-900">
          <div className="flex items-center gap-1 leading-none text-orange-400">
            <Medal2Fill className="text-sm leading-none" />
            {count > 1 ? <span className="text-sm leading-none">{count}</span> : null}
          </div>
        </ContributionAttribute>
      </button>
    </>
  );
}
