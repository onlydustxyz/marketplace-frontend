import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function FileListLine({ className }: Props) {
  return <i className={cn("ri-file-list-line", className)} />;
}
