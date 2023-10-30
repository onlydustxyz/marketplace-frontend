import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function InformationLine({ className }: Props) {
  return <i className={cn("ri-information-line", className)} />;
}
