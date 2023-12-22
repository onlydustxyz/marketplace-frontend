import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function Loader3Line({ className }: Props) {
  return <i className={cn("ri-loader-3-line", className)} />;
}
