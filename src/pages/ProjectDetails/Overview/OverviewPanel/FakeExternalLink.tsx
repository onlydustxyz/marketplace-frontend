import { ReactNode } from "react";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

interface Props {
  text?: string | null;
  icon?: ({ className }: { className?: string }) => ReactNode;
}

export default function FakeExternalLink({ text, icon }: Props) {
  const { T } = useIntl();
  return (
    <div
      className="group/link flex items-center gap-1 truncate"
      {...withTooltip(T("common.channel.preventAnonymousTooltips"))}
    >
      {icon?.({ className: "text-spacePurple-500 fill-spacePurple-500" })}
      <p className={cn("truncate group-hover/link:cursor-not-allowed")}>{text}</p>
    </div>
  );
}
