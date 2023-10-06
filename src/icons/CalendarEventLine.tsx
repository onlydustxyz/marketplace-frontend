import { cn } from "src/utils/cn";

export default function CalendarEventLine({ className }: { className?: string }) {
  return <i className={cn("ri-calendar-event-line", className)} />;
}
