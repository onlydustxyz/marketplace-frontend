import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function Link({ className }: Props) {
  return <i className={cn("ri-link", className)} />;
}
