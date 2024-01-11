import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function displayRelativeDate(date: NonNullable<Parameters<typeof dayjs.utc>[0]>) {
  return dayjs.utc(date).fromNow();
}
