import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}
export default function LockFill({ className }: Props) {
  return <i className={cn("ri-lock-fill", className)} />;
}
