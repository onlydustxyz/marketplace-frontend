import { ContributionCountFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import { formatDate } from ".";
import { Icon } from "./Legend";

type Props = {
  active?: boolean;
  hoveredBarIndex?: number;
  payload?: { payload: ContributionCountFragment }[];
};

export default function Tooltip({ active, hoveredBarIndex, payload }: Props) {
  const { T } = useIntl();

  const count = payload?.at(0)?.payload;

  return active && hoveredBarIndex !== undefined && count && count?.paidCount + count?.unpaidCount ? (
    <div className="flex flex-col gap-3 bg-greyscale-800 font-walsheim font-normal text-xs text-greyscale-200 rounded-lg p-3">
      <div>
        <div className="uppercase">
          {T("contributionGraph.tooltip.date", {
            from: formatDate(count),
            to: formatDate({ ...count, week: count.week + 1 }),
          })}
        </div>
        <div className="font-medium text-greyscale-50 text-sm">
          {T("contributionGraph.tooltip.contributionCount.total", {
            count: count.paidCount + count.unpaidCount,
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Icon color="#CE66FF" opacity={1} size={12} />
          {T("contributionGraph.tooltip.contributionCount.paid", { count: count.paidCount.toString() })}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Icon color="#CE66FF" opacity={1} size={12} secondary />
          {T("contributionGraph.tooltip.contributionCount.unpaid", { count: count.unpaidCount.toString() })}
        </div>
      </div>
    </div>
  ) : null;
}
