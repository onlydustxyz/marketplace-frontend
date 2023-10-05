import { GetContributionRewardsQuery } from "src/__generated/graphql";
import { Dollar } from "src/assets/icons/Dollar";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { useRewardTimeWorked } from "src/hooks/useRewardTimeWorked";
import CalendarEventLine from "src/icons/CalendarEventLine";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import TimeLine from "src/icons/TimeLine";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function RewardCard({
  reward,
}: {
  reward: GetContributionRewardsQuery["contributions"][number]["rewardItems"][number];
}) {
  const { T } = useIntl();

  const {
    paymentId,
    // TODO fix types
    paymentRequest: { amount, requestor, hoursWorked },
  } = reward;

  const timeWorked = useRewardTimeWorked(hoursWorked);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-greyscale-50/8 bg-white/2 p-4 font-walsheim shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-xs leading-none text-greyscale-300">
            <TimeLine className="text-base leading-none" />
            {/* TODO calculation */}
            {/* <span>{T("rewards.panel.contribution.createdOn", { date: displayRelativeDate(createdAt) })}</span> */}
            <span>3 days ago</span>
            &nbsp;&bull;&nbsp;
            {/* TODO calculation */}
            <span>Processed today</span>
          </div>
          <p className="text-base font-semibold leading-none text-greyscale-50">
            {T("rewards.panel.rewards.id", { id: formatPaymentId(paymentId) })}
          </p>
        </div>
        <Tag size={TagSize.Medium}>
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
        </Tag>
      </div>

      <div className="flex items-center gap-2">
        <RoundedImage src={requestor.avatarUrl} alt={requestor.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
        <p className="text-sm leading-none text-greyscale-300">
          {T("rewards.panel.rewards.fromUser")}&nbsp;
          {/* TODO behaviour */}
          <a href="" className="text-spacePurple-300 hover:text-spacePurple-200">
            {requestor.login}
          </a>
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
