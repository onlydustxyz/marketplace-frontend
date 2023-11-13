import { Dollar } from "src/assets/icons/Dollar";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag from "src/components/Tag";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import TimeLine from "src/icons/TimeLine";
import { ContributionDetail } from "src/types";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { formatPaymentId } from "src/utils/formatPaymentId";
import PayoutStatus from "../PayoutStatus/PayoutStatus";

export function RewardCard({
  reward,
  onClick,
}: {
  reward: ContributionDetail["rewards"][number];
  onClick?: () => void;
}) {
  const { T } = useIntl();
  const { open: openProfilePanel } = useContributorProfilePanel();

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-greyscale-50/8 bg-white/2 p-4 font-walsheim shadow-lg",
        onClick ? "cursor-pointer hover:bg-white/5" : ""
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-xs leading-none text-greyscale-300">
            <TimeLine className="text-base leading-none" />
            <span className="first-letter:uppercase">{displayRelativeDate(reward.createdAt)}</span>
            {reward.processedAt ? (
              <>
                &nbsp;&bull;&nbsp;
                <span>
                  {T("contributions.panel.rewards.processedAt", { date: displayRelativeDate(reward.processedAt) })}
                </span>
              </>
            ) : null}
          </div>
          <p className="text-base font-semibold leading-none text-greyscale-50">
            {T("contributions.panel.rewards.id", { id: formatPaymentId(reward.id) })}
          </p>
        </div>

        <PayoutStatus status={reward.status} />
      </div>

      <div className="flex items-center gap-2">
        <RoundedImage
          src={reward.from.avatarUrl ?? ""}
          alt={reward.from.login ?? ""}
          rounding={Rounding.Circle}
          size={ImageSize.Xxs}
        />
        <p className="text-sm leading-none text-greyscale-300">
          {T("contributions.panel.rewards.fromUser")}&nbsp;
          <button
            type="button"
            className="text-spacePurple-300 hover:text-spacePurple-200"
            onClick={e => {
              e.stopPropagation();
              if (reward.from.id) openProfilePanel(reward.from.id);
            }}
          >
            {reward.from.login}
          </button>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* TODO design */}
        {/* <Tag>
          <CalendarEventLine className="text-xs leading-none" />
          {timeWorked}
        </Tag> */}
        <Tag>
          <Dollar />
          {reward.amount}
        </Tag>
      </div>
    </article>
  );
}
