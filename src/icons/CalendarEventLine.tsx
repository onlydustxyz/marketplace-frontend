import classNames from "classnames";

export default function CalendarEventLine({ className }: { className?: string }) {
  return <i className={classNames("ri-calendar-event-line", className)} />;
}
