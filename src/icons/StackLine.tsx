import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function StackLine({ className }: Props) {
  return <i className={cn("ri-stack-line", className)} />;
}
