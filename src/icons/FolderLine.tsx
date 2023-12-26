import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function Folder({ className }: Props) {
  return <i className={cn("ri-folder-3-line", className)} />;
}
