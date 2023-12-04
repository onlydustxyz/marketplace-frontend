import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function TwitterFill({ className }: Props) {
  return <i className={cn("ri-twitter-fill", className)} />;
}
