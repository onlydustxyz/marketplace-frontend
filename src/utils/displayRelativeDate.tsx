import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function displayRelativeDate(date: NonNullable<Parameters<typeof dayjs.utc>[0]>) {
  return dayjs.utc(date).fromNow();
}
