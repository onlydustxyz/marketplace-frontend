import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function ErrorWarningLine({ className }: Props) {
  return <i className={cn("ri-error-warning-line", className)} />;
}
