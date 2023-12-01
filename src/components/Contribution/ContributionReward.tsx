import { Fragment } from "react";
import { useStackMyReward } from "src/App/Stacks";
import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import Medal2Fill from "src/icons/Medal2Fill";
import { Contribution } from "src/types";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function ContributionReward({
  contributionId,
  rewardIds,
  projectId,
  isMine,
}: {
  contributionId: Contribution["id"];
  projectId: string;
  isMine: boolean;
  rewardIds: Contribution["rewardIds"];
}) {
  const { T } = useIntl();
  const count = rewardIds.length;
  const tooltipId = `${contributionId}-${rewardIds?.[0] ?? "rewards"}`;
  const [openRewardPanel] = useStackMyReward();

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
                    openRewardPanel({ rewardId, projectId, ...(isMine ? { isMine: true } : {}) });
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
            openRewardPanel({ rewardId, projectId, ...(isMine ? { isMine: true } : {}) });
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
