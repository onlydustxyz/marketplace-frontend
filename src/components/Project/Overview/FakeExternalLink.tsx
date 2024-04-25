import { ReactNode } from "react";

import { withTooltip } from "src/components/Tooltip";
import { cn } from "src/utils/cn";

import { useIntl } from "hooks/translate/use-translate";

interface Props {
  text?: string;
  icon?: ({ className }: { className?: string }) => ReactNode;
}

export default function FakeExternalLink({ text, icon }: Props) {
  const { T } = useIntl();
  return (
    <div
      className="group/link flex items-center gap-1 truncate"
      {...withTooltip(T("common.channel.preventAnonymousTooltips"))}
    >
      {icon?.({ className: "mr-1" })}
      <p className={cn("truncate group-hover/link:cursor-not-allowed")}>{text}</p>
    </div>
  );
}
