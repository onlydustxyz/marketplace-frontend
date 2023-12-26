import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function HandCoinLine({ className }: Props) {
  return <i className={cn("ri-hand-coin-line", className)} />;
}
