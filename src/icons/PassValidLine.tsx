import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function PassValidLine({ className }: Props) {
  return <i className={cn("ri-pass-valid-line", className)} />;
}
