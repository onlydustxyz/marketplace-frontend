import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function LinkedinBoxFill({ className }: Props) {
  return <i className={cn("ri-linkedin-box-fill", className)} />;
}
