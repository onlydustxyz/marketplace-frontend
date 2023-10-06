import { GetContributionRewardsQuery } from "src/__generated/graphql";
import { Dollar } from "src/assets/icons/Dollar";
import PayoutStatus from "src/components/PayoutStatus";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag from "src/components/Tag";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import { usePayoutStatus } from "src/hooks/usePayoutStatus";
import { useRewardDetailPanel } from "src/hooks/useRewardDetailPanel";
import { useRewardTimeWorked } from "src/hooks/useRewardTimeWorked";
import CalendarEventLine from "src/icons/CalendarEventLine";
import TimeLine from "src/icons/TimeLine";
import { Reward } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { formatPaymentId } from "src/utils/formatPaymentId";

export function RewardCard({ reward }: { reward: Reward }) {
  const { T } = useIntl();

  const { close: closeRewardPanel } = useRewardDetailPanel();
  const { open: openProfilePanel } = useContributorProfilePanel();

  const {
    paymentId,
    paymentRequest: { amount, requestor, hoursWorked, requestedAt, payments },
  } = reward as unknown as Reward; // Cast required as generated type is full of anys

  const processedAt = payments.length ? payments[0].processedAt : null;

  const timeWorked = useRewardTimeWorked(hoursWorked);

  const { status: payoutStatus, invoiceNeeded, payoutInfoMissing } = usePayoutStatus(reward);

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

        <PayoutStatus
          id={`payment-status-${paymentId}`}
          status={payoutStatus}
          invoiceNeeded={invoiceNeeded}
          payoutInfoMissing={payoutInfoMissing}
        />
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
