import { cn } from "src/utils/cn";

export enum Size {
  Default = "Default",
  Large = "Large",
}

interface Props {
  className?: string;
}

export default function SyncLine({ className }: Props) {
  return <i role="sync" className={cn("ri-refresh-line", className)} />;
}
