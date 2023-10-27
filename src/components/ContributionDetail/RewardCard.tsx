import { Dollar } from "src/assets/icons/Dollar";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag from "src/components/Tag";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import { useRewardTimeWorked } from "src/hooks/useRewardTimeWorked";
import CalendarEventLine from "src/icons/CalendarEventLine";
import TimeLine from "src/icons/TimeLine";
import { Reward } from "src/types";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function RewardCard({ reward, onClick }: { reward: Reward; onClick?: () => void }) {
  const { T } = useIntl();

  const { open: openProfilePanel } = useContributorProfilePanel();

  const {
    paymentId,
    paymentRequest: { amount, requestor, hoursWorked, requestedAt, payments },
  } = reward as unknown as Reward; // Cast required as generated type is full of anys

  const processedAt = payments.length ? payments[0].processedAt : null;

  const timeWorked = useRewardTimeWorked(hoursWorked);

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
            <span className="first-letter:uppercase">{displayRelativeDate(requestedAt)}</span>
            {processedAt ? (
              <>
                &nbsp;&bull;&nbsp;
                <span>{T("contributions.panel.rewards.processedAt", { date: displayRelativeDate(processedAt) })}</span>
              </>
            ) : null}
          </div>
          <p className="text-base font-semibold leading-none text-greyscale-50">
            {T("contributions.panel.rewards.id", { id: formatPaymentId(paymentId) })}
          </p>
        </div>

        {
          // TODO use REST call
          /* <PayoutStatus status={payoutStatus} /> */
        }
      </div>

      <div className="flex items-center gap-2">
        <RoundedImage src={requestor.avatarUrl} alt={requestor.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
        <p className="text-sm leading-none text-greyscale-300">
          {T("contributions.panel.rewards.fromUser")}&nbsp;
          <button
            type="button"
            className="text-spacePurple-300 hover:text-spacePurple-200"
            onClick={e => {
              e.stopPropagation();
              openProfilePanel(requestor.githubUserId);
            }}
          >
            {requestor.login}
          </button>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Tag>
          <CalendarEventLine className="text-xs leading-none" />
          {timeWorked}
        </Tag>
        <Tag>
          <Dollar />
          {amount}
        </Tag>
      </div>
    </article>
  );
}
