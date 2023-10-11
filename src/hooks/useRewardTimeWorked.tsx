import { useIntl } from "src/hooks/useIntl";
import { getRewardTimeWorked, Units } from "src/utils/getRewardTimeWorked";

export function useRewardTimeWorked(hoursWorked: number) {
  const { T } = useIntl();

  const { time, unit } = getRewardTimeWorked(hoursWorked);

  const token = unit === Units.Days ? T("reward.time.days", { count: time }) : T("reward.time.hours", { count: time });

  return `${time} ${token}`;
}
