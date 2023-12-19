import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function Medal2Fill({ className }: Props) {
  return <i className={cn("ri-medal-2-fill", className)} />;
}
