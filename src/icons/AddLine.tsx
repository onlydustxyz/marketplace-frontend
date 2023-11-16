import { cn } from "src/utils/cn";

export default function AddLine({ className }: { className?: string }) {
  return <i className={cn("ri-add-line", className)} />;
}
