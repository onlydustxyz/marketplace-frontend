import { GetContributionRewardsQuery } from "src/__generated/graphql";
import { Dollar } from "src/assets/icons/Dollar";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import { useRewardDetailPanel } from "src/hooks/useRewardDetailPanel";
import { useRewardTimeWorked } from "src/hooks/useRewardTimeWorked";
import CalendarEventLine from "src/icons/CalendarEventLine";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import TimeLine from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function RewardCard({
  reward,
}: {
  reward: GetContributionRewardsQuery["contributions"][number]["rewardItems"][number];
}) {
  const { T } = useIntl();

  const { close: closeRewardPanel } = useRewardDetailPanel();
  const { open: openProfilePanel } = useContributorProfilePanel();

  const {
    paymentId,
    // TODO fix types
    paymentRequest: { amount, requestor, hoursWorked, requestedAt, payments },
  } = reward;

  const [{ processedAt }] = payments.length ? payments : [{}];

  const timeWorked = useRewardTimeWorked(hoursWorked);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-greyscale-50/8 bg-white/2 p-4 font-walsheim shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-xs leading-none text-greyscale-300">
            <TimeLine className="text-base leading-none" />
            <span>{displayRelativeDate(requestedAt)}</span>
            {processedAt ? (
              <>
                &nbsp;&bull;&nbsp;
                <span>{T("rewards.panel.rewards.processedAt", { date: displayRelativeDate(processedAt) })}</span>
              </>
            ) : null}
          </div>
          <p className="text-base font-semibold leading-none text-greyscale-50">
            {T("rewards.panel.rewards.id", { id: formatPaymentId(paymentId) })}
          </p>
        </div>
        {/* TODO handle status */}
        {/* <Tag size={TagSize.Medium}>
          <CheckLine className="text-base leading-none" />
          {T("reward.status.complete")}
        </Tag>
        <Tag size={TagSize.Medium}>
          <TimeLine className="text-base leading-none" />
          {T("reward.status.processing")}
        </Tag>
        <Tag borderColor={TagBorderColor.MultiColor} size={TagSize.Medium}>
          <ErrorWarningLine className="text-base leading-none text-pink-500" />
          {T("reward.status.invoicePending")}
        </Tag> */}
      </div>

      <div className="flex items-center gap-2">
        <RoundedImage src={requestor.avatarUrl} alt={requestor.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
        <p className="text-sm leading-none text-greyscale-300">
          {T("rewards.panel.rewards.fromUser")}&nbsp;
          <button
            type="button"
            className="text-spacePurple-300 hover:text-spacePurple-200"
            onClick={() => {
              closeRewardPanel();
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
