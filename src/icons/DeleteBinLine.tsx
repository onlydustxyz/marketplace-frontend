import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function DeleteBinLine({ className }: Props) {
  return <i className={cn("ri-delete-bin-2-line", className)} />;
}
