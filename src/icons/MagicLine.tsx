import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function MagicLine({ className }: Props) {
  return <i className={cn("ri-magic-line", className)} />;
}
